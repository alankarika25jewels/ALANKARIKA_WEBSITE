#!/usr/bin/env node

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');
const path = require('path');

async function runLighthouse(url, options = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const { lhr } = await lighthouse(url, {
    port: (new URL(browser.wsEndpoint())).port,
    output: 'json',
    logLevel: 'info',
    ...options
  });

  await browser.close();
  return lhr;
}

async function generatePerformanceReport() {
  const url = process.env.SITE_URL || 'http://localhost:3000';
  const outputDir = path.join(process.cwd(), 'performance-reports');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Running Lighthouse audit for ${url}...`);
  
  try {
    const results = await runLighthouse(url, {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0
      }
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(outputDir, `lighthouse-report-${timestamp}.json`);
    
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log(`\n📊 Performance Report Generated:`);
    console.log(`📁 Location: ${reportPath}`);
    console.log(`\n🎯 Performance Score: ${Math.round(results.categories.performance.score * 100)}/100`);
    console.log(`♿ Accessibility Score: ${Math.round(results.categories.accessibility.score * 100)}/100`);
    console.log(`✅ Best Practices Score: ${Math.round(results.categories['best-practices'].score * 100)}/100`);
    console.log(`🔍 SEO Score: ${Math.round(results.categories.seo.score * 100)}/100`);
    
    // Display key metrics
    const metrics = results.audits;
    console.log(`\n📈 Key Metrics:`);
    console.log(`First Contentful Paint: ${metrics['first-contentful-paint']?.displayValue || 'N/A'}`);
    console.log(`Largest Contentful Paint: ${metrics['largest-contentful-paint']?.displayValue || 'N/A'}`);
    console.log(`First Input Delay: ${metrics['max-potential-fid']?.displayValue || 'N/A'}`);
    console.log(`Cumulative Layout Shift: ${metrics['cumulative-layout-shift']?.displayValue || 'N/A'}`);
    console.log(`Speed Index: ${metrics['speed-index']?.displayValue || 'N/A'}`);
    
    // Display opportunities for improvement
    const opportunities = Object.values(metrics).filter(audit => 
      audit.details?.type === 'opportunity' && audit.score < 1
    );
    
    if (opportunities.length > 0) {
      console.log(`\n🚀 Opportunities for Improvement:`);
      opportunities.slice(0, 5).forEach(opportunity => {
        console.log(`• ${opportunity.title}: ${opportunity.displayValue}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error generating performance report:', error.message);
    process.exit(1);
  }
}

// Run the performance monitoring
if (require.main === module) {
  generatePerformanceReport();
}

module.exports = { generatePerformanceReport }; 