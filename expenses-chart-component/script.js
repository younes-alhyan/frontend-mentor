const dataContainer = document.querySelector("#data");

const fetchData = async () => {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
};

async function build() {
  const data = await fetchData();
  data.forEach((day) => {
    const chart = document.createElement("div");
    chart.className = "chart";
    chart.id = day.day;
    chart.style.height = `${day.amount * 2.5}px`; // Adjust the multiplier for your desired height scaling
    dataContainer.appendChild(chart);
    createDayElement(chart, day);
    creatValueElement(chart, day);
  });
}
function creatValueElement(chart, day) {
  const valueElement = document.createElement("div");
  valueElement.className = "value";
  valueElement.textContent = `$${day.amount}`;
  chart.appendChild(valueElement);
}
function createDayElement(chart, day) {
  const dayElement = document.createElement("div");
  dayElement.className = "day";
  dayElement.textContent = day.day;
  chart.appendChild(dayElement);
}
build();
