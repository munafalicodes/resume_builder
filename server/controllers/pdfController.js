const puppeteer = require('puppeteer');

exports.generatePDF = async (req, res) => {
    const { htmlContent } = req.body;

    if (!htmlContent) {
        return res.status(400).json({ error: 'HTML content is required' });
    }

    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // precise styling for A4
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        await page.addStyleTag({
            content: `
            @page { size: A4; margin: 0; }
            body { margin: 0; font-family: 'Times New Roman', serif; }
        `});

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
        });

        await browser.close();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': 'attachment; filename="resume.pdf"'
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};
