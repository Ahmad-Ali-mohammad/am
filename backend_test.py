#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Enterprise CMS
Tests all authentication, user management, content, comments, settings, newsletter, and contact APIs
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any, Optional

class CMSAPITester:
    def __init__(self, base_url="https://cms-for-orgs.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.token = None
        self.admin_user = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
            self.failed_tests.append({"test": name, "error": details})

    def make_request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                    expected_status: int = 200, auth_required: bool = True) -> tuple[bool, Dict]:
        """Make API request with error handling"""
        url = f"{self.api_base}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = self.session.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=headers)
            else:
                return False, {"error": f"Unsupported method: {method}"}

            success = response.status_code == expected_status
            try:
                response_data = response.json() if response.content else {}
            except:
                response_data = {"raw_response": response.text}
            
            if not success:
                response_data["status_code"] = response.status_code
                response_data["expected_status"] = expected_status
            
            return success, response_data

        except Exception as e:
            return False, {"error": str(e)}

    def test_auth_register(self):
        """Test user registration"""
        test_data = {
            "email": f"test_user_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "TestPass123!",
            "name": "Test User",
            "role": "viewer"
        }
        
        success, response = self.make_request('POST', 'auth/register', test_data, 200, False)
        
        if success and 'access_token' in response:
            self.log_test("User Registration", True)
            return True
        else:
            self.log_test("User Registration", False, str(response))
            return False

    def test_auth_login(self):
        """Test admin login with provided credentials"""
        login_data = {
            "email": "admin@cms.com",
            "password": "admin123"
        }
        
        success, response = self.make_request('POST', 'auth/login', login_data, 200, False)
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.admin_user = response.get('user', {})
            self.log_test("Admin Login", True)
            return True
        else:
            self.log_test("Admin Login", False, str(response))
            return False

    def test_auth_me(self):
        """Test get current user info"""
        success, response = self.make_request('GET', 'auth/me')
        
        if success and 'email' in response:
            self.log_test("Get Current User", True)
            return True
        else:
            self.log_test("Get Current User", False, str(response))
            return False

    def test_users_crud(self):
        """Test user management CRUD operations"""
        # Test GET users
        success, users = self.make_request('GET', 'users')
        if not success:
            self.log_test("Get Users", False, str(users))
            return False
        self.log_test("Get Users", True)

        # Test CREATE user
        new_user_data = {
            "email": f"new_user_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "NewUserPass123!",
            "name": "New Test User",
            "role": "editor"
        }
        
        success, created_user = self.make_request('POST', 'users', new_user_data, 200)
        if not success:
            self.log_test("Create User", False, str(created_user))
            return False
        
        user_id = created_user.get('id')
        if not user_id:
            self.log_test("Create User", False, "No user ID returned")
            return False
        
        self.log_test("Create User", True)

        # Test UPDATE user
        update_data = {
            "name": "Updated Test User",
            "role": "viewer"
        }
        
        success, updated_user = self.make_request('PUT', f'users/{user_id}', update_data)
        if success:
            self.log_test("Update User", True)
        else:
            self.log_test("Update User", False, str(updated_user))

        # Test DELETE user
        success, delete_response = self.make_request('DELETE', f'users/{user_id}')
        if success:
            self.log_test("Delete User", True)
        else:
            self.log_test("Delete User", False, str(delete_response))

        return True

    def test_content_management(self):
        """Test content management APIs"""
        # Test GET content
        success, content = self.make_request('GET', 'content', auth_required=False)
        if not success:
            self.log_test("Get Content", False, str(content))
            return False
        self.log_test("Get Content", True)

        # Test UPDATE content
        updated_content = content.copy()
        updated_content['hero']['title'] = f"Updated Title {datetime.now().strftime('%H:%M:%S')}"
        
        success, update_response = self.make_request('PUT', 'content', updated_content)
        if success:
            self.log_test("Update Content", True)
        else:
            self.log_test("Update Content", False, str(update_response))

        # Test UPDATE content section
        hero_data = {
            "title": f"Section Update {datetime.now().strftime('%H:%M:%S')}",
            "subtitle": "Test subtitle update"
        }
        
        success, section_response = self.make_request('PUT', 'content/hero', hero_data)
        if success:
            self.log_test("Update Content Section", True)
        else:
            self.log_test("Update Content Section", False, str(section_response))

        return True

    def test_comments_system(self):
        """Test comments system APIs"""
        # Test GET comments (admin only)
        success, comments = self.make_request('GET', 'comments')
        if not success:
            self.log_test("Get Comments (Admin)", False, str(comments))
            return False
        self.log_test("Get Comments (Admin)", True)

        # Test CREATE comment (public)
        comment_data = {
            "articleId": "test-article-id",
            "author": "Test Commenter",
            "email": "commenter@test.com",
            "content": "This is a test comment"
        }
        
        success, comment_response = self.make_request('POST', 'comments', comment_data, 200, False)
        if success:
            self.log_test("Create Comment", True)
        else:
            self.log_test("Create Comment", False, str(comment_response))

        # Test GET article comments (public)
        success, article_comments = self.make_request('GET', 'comments/article/test-article-id', auth_required=False)
        if success:
            self.log_test("Get Article Comments", True)
        else:
            self.log_test("Get Article Comments", False, str(article_comments))

        return True

    def test_settings_management(self):
        """Test site settings APIs"""
        # Test GET settings
        success, settings = self.make_request('GET', 'settings', auth_required=False)
        if not success:
            self.log_test("Get Settings", False, str(settings))
            return False
        self.log_test("Get Settings", True)

        # Test UPDATE settings (admin only)
        updated_settings = settings.copy()
        updated_settings['siteName'] = f"Updated Site Name {datetime.now().strftime('%H:%M:%S')}"
        
        success, update_response = self.make_request('PUT', 'settings', updated_settings)
        if success:
            self.log_test("Update Settings", True)
        else:
            self.log_test("Update Settings", False, str(update_response))

        return True

    def test_newsletter_system(self):
        """Test newsletter subscription APIs"""
        # Test newsletter subscription
        subscription_data = {
            "email": f"subscriber_{datetime.now().strftime('%H%M%S')}@test.com"
        }
        
        success, sub_response = self.make_request('POST', 'newsletter/subscribe', subscription_data, 200, False)
        if success:
            self.log_test("Newsletter Subscribe", True)
        else:
            self.log_test("Newsletter Subscribe", False, str(sub_response))

        # Test get subscribers (admin only)
        success, subscribers = self.make_request('GET', 'newsletter/subscribers')
        if success:
            self.log_test("Get Newsletter Subscribers", True)
        else:
            self.log_test("Get Newsletter Subscribers", False, str(subscribers))

        return True

    def test_contact_system(self):
        """Test contact message APIs"""
        # Test submit contact message
        contact_data = {
            "name": "Test Contact",
            "email": "contact@test.com",
            "message": "This is a test contact message"
        }
        
        success, contact_response = self.make_request('POST', 'contact', contact_data, 200, False)
        if success:
            self.log_test("Submit Contact Message", True)
        else:
            self.log_test("Submit Contact Message", False, str(contact_response))

        # Test get contact messages (admin only)
        success, messages = self.make_request('GET', 'contact/messages')
        if success:
            self.log_test("Get Contact Messages", True)
        else:
            self.log_test("Get Contact Messages", False, str(messages))

        return True

    def test_analytics_api(self):
        """Test analytics API"""
        success, analytics = self.make_request('GET', 'analytics')
        if success:
            self.log_test("Get Analytics", True)
        else:
            self.log_test("Get Analytics", False, str(analytics))

        return True

    def run_all_tests(self):
        """Run comprehensive test suite"""
        print(f"🚀 Starting CMS API Testing - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"🔗 Testing against: {self.base_url}")
        print("=" * 60)

        # Authentication Tests
        print("\n📝 Testing Authentication...")
        if not self.test_auth_login():
            print("❌ Admin login failed - cannot continue with authenticated tests")
            return self.generate_report()
        
        self.test_auth_register()
        self.test_auth_me()

        # User Management Tests
        print("\n👥 Testing User Management...")
        self.test_users_crud()

        # Content Management Tests
        print("\n📄 Testing Content Management...")
        self.test_content_management()

        # Comments System Tests
        print("\n💬 Testing Comments System...")
        self.test_comments_system()

        # Settings Tests
        print("\n⚙️ Testing Settings Management...")
        self.test_settings_management()

        # Newsletter Tests
        print("\n📧 Testing Newsletter System...")
        self.test_newsletter_system()

        # Contact Tests
        print("\n📞 Testing Contact System...")
        self.test_contact_system()

        # Analytics Tests
        print("\n📊 Testing Analytics...")
        self.test_analytics_api()

        return self.generate_report()

    def generate_report(self):
        """Generate test report"""
        print("\n" + "=" * 60)
        print("📊 TEST RESULTS SUMMARY")
        print("=" * 60)
        print(f"✅ Tests Passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Tests Failed: {len(self.failed_tests)}")
        
        if self.failed_tests:
            print("\n🔍 FAILED TESTS:")
            for failure in self.failed_tests:
                print(f"  • {failure['test']}: {failure['error']}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": len(self.failed_tests),
            "success_rate": success_rate,
            "failures": self.failed_tests,
            "admin_login_success": self.token is not None
        }

def main():
    """Main test execution"""
    tester = CMSAPITester()
    results = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if results["success_rate"] >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())