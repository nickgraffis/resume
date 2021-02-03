

const makePDF = () => {
 //  var pdf = new jsPDF('p', 'pt');
 //  pdf.internal.scaleFactor = 1.5;
 //  pdf.addHTML(document.getElementById('resume'), 0, 0, {
 //   pagesplit: true
 // }, function() {
 //   pdf.save('test.pdf');
 // });
 var element = document.getElementById('resume');
 html2pdf(element);
}
