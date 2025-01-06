document.addEventListener("DOMContentLoaded", function () {
  const data = [
    { study: "Study 1", effect: 0.8 },
    { study: "Study 2", effect: 1.2 },
    { study: "Study 3", effect: 0.5 },
  ];

  const chart = document.getElementById("chart");
  data.forEach((item) => {
    const bar = document.createElement("div");
    bar.style.width = item.effect * 100 + "px";
    bar.style.height = "20px";
    bar.style.backgroundColor = "#007bff";
    bar.style.marginBottom = "10px";
    bar.textContent = `${item.study} (${item.effect})`;
    bar.style.color = "white";
    chart.appendChild(bar);
  });
});
