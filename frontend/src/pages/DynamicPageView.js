import React from 'react';

const DynamicPageView = ({ page }) => {
  if (!page) return null;
  
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">{page.title}</h1>
        <div 
          className="prose prose-lg max-w-none" 
          dangerouslySetInnerHTML={{ __html: page.content }} 
        />
      </div>
    </div>
  );
};

export default DynamicPageView;
