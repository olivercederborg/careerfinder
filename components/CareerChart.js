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
			label: "Salary",
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
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			backgroundColor: "#fff",
			titleColor: "#000",
			bodyColor: "#000",
			titleAlign: "center",
			bodyAlign: "center",
			cornerRadius: 6,
			displayColors: false,
			padding: 12,
			borderWidth: 1,
			borderColor: "#dedede",
			titleFont: {
				size: 15
			},
			bodyFont: {
				size: 14
			},
			callbacks: {
				title: function (context) {
					return "$" + context[0].formattedValue;
				},
				label: function (context) {
					return context.label;
				}
			}
		}
	},
	tooltips: {}
};

export default function CareerChart() {
	return (
		<>
			<div className='h-[500px] md:h-[400px] overflow-hidden'>
				<Line data={data} options={options} className='h-full' />
			</div>
		</>
	);
}
