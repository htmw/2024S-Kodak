const showChartButton = document.getElementById('showChart');
const pieChartCanvas = document.getElementById('pieChart');

showChartButton.addEventListener('click', () => {
 const labels = [1, 2, 3, 4];
 const relevanceScores = [30, 50, 10, 10]; 

 const totalScore = relevanceScores.reduce((acc, score) => acc + score, 0);
 if (totalScore > 100 || relevanceScores.some(score => score < 0 || score > 100)) {
  console.error('Invalid relevance scores. Please ensure they are between 0 and 100.');
  return; // Prevent chart creation with invalid data
 }

 const pieData = {
  labels: labels,
  datasets: [{
   data: relevanceScores,
   backgroundColor: ['red', 'green', 'blue', 'orange'],
   borderColor: 'black',
   borderWidth: 1
  }]
 };

 const pieChart = new Chart(pieChartCanvas.getContext('2d'), {
  type: 'pie',
  data: pieData,
  options: {
   responsive: true,
   maintainAspectRatio: false,
   legend: {
    display: true,
    position: 'bottom'
   }
  }
 });
}); 
