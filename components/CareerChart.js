import { Line } from "react-chartjs-2";

const data = {
	labels: [
		["M1", "2019"],
		"M2",
		"M3",
		"M4",
		"M5",
		"M6",
		["M7", "2019"],
		"M8",
		"M9",
		"M10",
		"M11",
		"M12"
	],
	datasets: [
		{
			label: "Potential Salary",
			data: [
				80000,
				85000,
				88000,
				86421,
				91874,
				94543,
				98457,
				97543,
				99726,
				103665,
				105843,
				109385
			],
			fill: false,
			backgroundColor: "black",
			borderColor: "black"
		}
	]
};

const options = {
	legend: {
		display: false
	},
	tooltips: {
		callbacks: {
			label: function (tooltipItem) {
				return tooltipItem.yLabel;
			}
		}
	}
};

export default function CareerChart() {
	return (
		<>
			<Line data={data} options={options} height='400' className='' />
		</>
	);
}
