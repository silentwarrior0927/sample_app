// Breakup fee by judge comparison

$(document).ready(function() {

	if($('#breakup_fee_comparison_by_judge').length) {

		// // Function to generate Gaussian pdf
		// function normalPdf(x, mean, stddev) {
		// 	var y = 1 / (stddev * Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, - (Math.pow(x - mean, 2) / (2 * Math.pow(stddev, 2))));
		// 	//console.log('normal', x, mean, stddev, y);
		// 	return y;
		// };

		var margin = {top: 0, right: 233, bottom: 31, left: 233},
			w = 884.352 - margin.left - margin.right,
			h = 168 - margin.top - margin.bottom;

		// // Configure pdfs
		// var pdf = d3.svg.line()
		// 				.x(function(d) { return xScale(d.xval); })
		// 				.y(function(d) { return yScale(normalPdf(d.xval, d.mean, .015)); })
		// 				.interpolate("basis");

		// Format numbers
		var f1 = [];
			f1[0] = d3.format(".1%");
			f1[1] = d3.format("$,.0");

		// Build scales & axis
		var max = document.getElementById("highest_breakup_fee_percentage").innerHTML;
		var xScale = d3.scale.linear()
				   .domain([0, max])
				   .range([0, w]);
		var xAxis = d3.svg.axis()
					  .scale(xScale)
					  .orient("bottom")
					  .tickSize(-6, -5)
					  .tickFormat(f1[0]);		   
		var yScale = d3.scale.linear()
					   .domain([0, 30])
					   .range([h, 0]);

		d3.json("/data_pages/data_histogram.json", function(error, json) {

			// Count number of cases assigned to each judge
			var caseCountJson = JSON.parse(JSON.stringify(json))
			caseCountJson = d3.nest()
							  .key(function(d) { return d.judge })
							  .rollup(function(leaves) { return leaves.length })
							  .entries(caseCountJson);

			// Build data points
			// Determine which judges get their own graphs
			var bucketSize = .005;
			json.forEach(function(d) {
				d.xType = Math.floor(d.computation_breakup_fee_percentage_2 / bucketSize);
				d.x = xScale(d.xType * bucketSize + .0005);

				for(var i = 0; i < caseCountJson.length; i++) {
					if(caseCountJson[i].key == d.judge) {
						if(caseCountJson[i].values >= 4) {
							d.judgeGraph = d.judge;
							var tempJson = JSON.parse(JSON.stringify(d));
							tempJson.judgeGraph = "all";
							json.push(tempJson);
						} else d.judgeGraph = "all";
						break;
					}
				}
			});
			// Compute quartiles of box-and-whisker plots
			var quartilesJson = JSON.parse(JSON.stringify(json));
			quartilesJson = d3.nest()
							  .key(function(d) { return d.judgeGraph; }).sortKeys(d3.ascending)
							  .sortValues(function(a,b) { return a.computation_breakup_fee_percentage_2 - b.computation_breakup_fee_percentage_2; })
							  .rollup(function(leaves) {	
							  								breakupFees = [];
							  								for(var i = 0; i < leaves.length; i++) {
							  									breakupFees.push(leaves[i].computation_breakup_fee_percentage_2);
							  								}
							  								breakupFees.sort(d3.ascending);
							  								return { min: d3.min(breakupFees), first: d3.quantile(breakupFees, .25), median: d3.quantile(breakupFees, .5), third: d3.quantile(breakupFees, .75), max: d3.max(breakupFees) };
							  						   })
							  .entries(quartilesJson);
			// Compute y-positions
			json = d3.nest()
					 .key(function(d) { return d.judgeGraph; }).sortKeys(d3.ascending)
					 .sortValues(function(a,b) { return a.computation_breakup_fee_percentage_2 - b.computation_breakup_fee_percentage_2; })
					 .entries(json);
			for(i = 0; i < json.length; i++) {
				var startxType = json[i].values[0].xType,
					startk = -1;
				for(j = 0; j < json[i].values.length; j++) {
					if(json[i].values[j].xType > startxType) {
						startxType = json[i].values[j].xType;
						startk = 0;
					} else startk++;
					json[i].values[j].yType = startk;
					json[i].values[j].y = -8 + yScale(json[i].values[j].yType*1.68)
				}
			}
			
			// Build visualization container
			var svg = d3.select("#breakup_fee_comparison_by_judge").selectAll("svg")
																   .data(json)
																   .enter()
																.append("svg:svg")
																   .attr("width", w + margin.left + margin.right)
																   .attr("height", h + margin.top + margin.bottom)
																   .attr("class", "box")
																   .style("display", "block")
																   // .style("border", "1px solid red")
																   .style("border-bottom", "1px solid #e9e9e9")
																.append("g")
																   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Display title & axis
			svg.append("text")
			   .attr("class", "title")
			   .attr("x", w / 2)
			   .attr("y", 16)
			   .text(function(d) { if(d.values[0].judgeGraph == "all") return "All judges"; else return d.values[0].judgeGraph[0] + " - " + d.values[0].court[0]; })
			svg.append("g")
			   .attr("class", "axis")
			   .attr("transform", "translate(" + 0 + "," + (margin.top + h) + ")")
			   .call(xAxis)
			.append("text")
			   .attr("text-anchor", "middle")
			   .attr("x", w / 2)
			   .attr("y", 26)
			   .text("Breakup fee + expense reimbursement as a percentage of stalking horse bid");

			// Display data points
			svg.selectAll("rect .sale")
			   .data(function(d) { return d.values; })
			   .enter()
			   .append("rect")
			   .attr("class", "sale")
			   .attr("x", function(d) { return d.x; })
			   .attr("y", function(d) { return d.y; })
			   .attr("width", 31)
			   .attr("height", 6)
			   .on("mouseenter", function(d) {
									
									var thisRect = d3.select(this);
									thisRect.style({ "fill":"#8b8bc2", "stroke":"#000028", "stroke-width":"2" });

									// Get this bar's x/y values, then augment for the tooltip
									var xPosition = this.getBoundingClientRect().left + window.scrollX;
									var yPosition = this.getBoundingClientRect().top + window.scrollY;
									console.log("x: " + xPosition + ", y: " + yPosition);
									// Update the tooltip position and value
									d3.select("#sale_details1")
									  .style("left", xPosition + "px")
									  .style("top", yPosition + 12 + "px");
									
									d3.select("#debtor1")
									  .text(d.debtor.join(" / "));
									d3.select("#assets1")
									  .text(d.assets.join("; "));
									d3.select("#stalking_horse_bid1")
									  .text(f1[1](d.stalking_horse_bid_1[0]));
									d3.select("#breakup_fee1")
									  .text(f1[0](d.computation_breakup_fee_percentage_2))
									d3.select("#judge1")
									  .text(d.judge + " - " + d.court);

									// Display the tooltip and give it an appropriate height
									d3.select("#sale_details1").style("display", "block");
									var table_height = $("#sale_details_table1").height();
									$("#sale_details1").height(table_height + 2);

							})
			   .on("mouseleave", function(d) {
					d3.select(this).style({ "fill":"#3d3d99", "stroke":null, "stroke-width":null });
					d3.select("#sale_details1").style("display", "none").style("left", "0px").style("top", "0px");
			   });

			// Display box-and-whisker plot
			bw = svg.data(quartilesJson);
			bw.append("svg:line")
			  .attr("class", "bw_plot bw_plot-dash")
			  .attr("x1", function(d) { return xScale(d.values.min); })
			  .attr("x2", function(d) { return xScale(d.values.max); })
			  .attr("y1", function(d) { return h / 2; })
			  .attr("y2", function(d) { return h / 2; });
			bw.append("svg:rect")
			  .attr("class", "bw_plot")
			  .attr("x", function(d) { return xScale(d.values.first); })
			  .attr("y", function(d) { return h / 2 - 8; })
			  .attr("width", function(d) { return xScale(d.values.third) - xScale(d.values.first); })
			  .attr("height", 16)
			bw.append("svg:line")
			  .attr("class", "bw_plot")
			  .attr("x1", function(d) { return xScale(d.values.min); })
			  .attr("x2", function(d) { return xScale(d.values.min); })
			  .attr("y1", function(d) { return h / 2 - 8.6; })
			  .attr("y2", function(d) { return h / 2 + 8.6; });
			bw.append("svg:line")
			  .attr("class", "bw_plot")
			  .attr("x1", function(d) { return xScale(d.values.median); })
			  .attr("x2", function(d) { return xScale(d.values.median); })
			  .attr("y1", function(d) { return h / 2 - 8; })
			  .attr("y2", function(d) { return h / 2 + 8; });
			bw.append("svg:line")
			  .attr("class", "bw_plot")
			  .attr("x1", function(d) { return xScale(d.values.max); })
			  .attr("x2", function(d) { return xScale(d.values.max); })
			  .attr("y1", function(d) { return h / 2 - 8.6; })
			  .attr("y2", function(d) { return h / 2 + 8.6; });

			// // Display Pdf
			// var xForPdf = [];
			// for (var i = 0; i < max*1000; i++) {
			// 	xForPdf.push({xval: i/1000});
			// }
			// xForPdf.push({xval: max})
			// console.log(xForPdf)
			// svg.data(parameterJson)
			//    .append("svg:path")
			//    .attr("d", function(d) {
			// 							for(var i = 0; i < xForPdf.length; i++) {
			// 								xForPdf[i].mean = d.values;
			// 							}
			// 							return pdf(xForPdf);
			// 						  })
			//    .attr("class", "pdf");

			// // Display titles
			// svg.append("text")
			//    .attr("x", 0)
			//    .attr("y", 20)
			//    .text(function(d) { return d.key + " (" + d.values[0].court + ")"});
			
		});

	};

	// Returns a function to compute the interquartile range.
	function iqr(k) {
		return function(d, i) {
			var q1 = d.quartiles[0],
			q3 = d.quartiles[2],
			iqr = (q3 - q1) * k,
			i = -1,
			j = d.length;
			while (d[++i] < q1 - iqr);
			while (d[--j] > q3 + iqr);
			return [i, j];
		};
	}

});
// END Breakup fee by judge comparison

// Breakup fee versus stalking horse bid comparison
$(document).ready(function() {

	if($('#breakup_fee_versus_consideration').length) {

		var margin = {top: 26, right: 116, bottom: 10, left: 116},
			w = 884.352 - margin.left - margin.right,
			h = 400 - margin.top - margin.bottom;

		// Build visualization container
		var svg = d3.select("#breakup_fee_versus_consideration").append("svg:svg")
																.attr("width", w + margin.left + margin.right)
																.attr("height", h + margin.top + margin.bottom)
																.style("display", "block")
															.append("g")
																.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Format numbers
		var f2 = [];
			f2[0] = d3.format(".1%");
			f2[1] = d3.format("$,.0");
			f2[2] = d3.format(".0%");

		// d3.json("/data_pages/data_pdf_plot.json", function(error, json) {
		d3.csv("/data_pages/data_force_plot_static.csv", function(error, json) {

			// Print data load error
			if(error) console.log(error);

			// Build scales & axis
			// var max = d3.max(json, function(d) {return d.computation_breakup_fee_percentage_2});
			var max = d3.max(json, function(d) {return d.data_computation_breakup_fee_percentage_2});
			var xScale = d3.scale.linear()
						   .domain([0, max])
						   .range([0, w]);
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .tickFormat(f2[0]);
			var colorArray = ["#3d3d99", "#8b8bc2", "#D8D8EB", "#FFEBD9", "#FFC48C", "#ff9d40"]
			var xColorScale = d3.scale.threshold()
									  .domain([.00999999, .01999999, .02999999, .03999999, .04999999])
									  .range(colorArray);
			// Display axis
			svg.append("g")
			   .attr("class", "axis")
			   .call(xAxis)
			.append("text")
			   .attr("text-anchor", "middle")
			   .attr("x", w/2)
			   .attr("y", -5)
			   .text("Breakup fee + expense reimbursement as a percentage of stalking horse bid");

			// Build legend
			var legend = d3.select("#breakup_fee_versus_consideration svg").append("svg:svg")
						   .attr("y", h)
						   .attr("class", "legend");
						
			var legendGroups = legend.selectAll("g")
									 .data([-1].concat(xColorScale.domain()), function(d) { return d; })
									 .enter()
									 .append("g")
									 .attr("transform", function(d, i) { return "translate(" + (margin.left + (w - 300) + margin.right / 2 + 50 * i) + ", 0)"; });

			legendGroups.append("rect")
						.attr("width", 50)
						.attr("height", 3)
						.style("fill", function(d, i) { return colorArray[i]; });

			legendGroups.append("line")
						.attr("y1", 0)
						.attr("y2", function(d, i) { if(i === 0) return 0; else return 8; })
						.attr("height", 3)
						.style("stroke", "#7f7f7f")
						.style("stroke-width", 1)

			legendGroups.append("text")
						.attr("x", 0)
						.attr("y", 18)
						.attr("text-anchor", "middle")
						.attr("dy", ".35em")
						.text(function(d, i) { if(i === 0) return ""; else return f2[2](d.toFixed(2)); });

			legend.append("text")
				  .attr("x", margin.left / 2)
				  .attr("y", 20)
				  .attr("text-anchor", "middle")
				  .text("LEGEND:")

			legend.append("text")
				  .attr("x", margin.left)
				  .attr("y", 8)
				  .append("tspan")
					.text("The ")
				  .append("tspan")
					.style("font-weight", "bold")
					.text("AREA ")
				  .append("tspan")
					.style("font-weight", "normal")
					.text("of each circle represents the value of a stalking horse bid.")
			legend.append("text")
				  .attr("x", margin.left)
				  .attr("y", 20)
				  .append("tspan")
					.text("The ")
				  .append("tspan")
					.style("font-weight", "bold")
					.text("COLOR ")
				  .append("tspan")
					.style("font-weight", "normal")
					.text("of each circle represents the breakup fee + expense reimbursement")
			legend.append("text")
				.attr("x", margin.left)
				.attr("y", 32)
				.text("as a percentage of the stalking horse bid (see right).")
			legend.append("text")
				.attr("x", margin.left + (w - 300) + 150 + margin.right / 2)
				.attr("y", 32)
				.attr("text-anchor", "middle")
				.style("font-size", "8.5px")
				.text("Breakup fee + expense reimbursement as a percentage of stalking horse bid")

			// // Build data points
			// var foci = [];
			// var non_foci = [];
			// for(var i = 0; i < json.length; i++) {
			// 	var current_radius = Math.sqrt(json[i].stalking_horse_bid_1/(100000*Math.PI));
			// 	if(foci.length === 0) {
			// 		foci.push({
			// 						x: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						y: h/2,
			// 						cx: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						cy: h/2,
			// 						fixed: true,
			// 						color: xColorScale(json[i].computation_breakup_fee_percentage_2),
			// 						radius: current_radius,
			// 						type: foci.length,
			// 						data_debtor: json[i].debtor.join(" / "),
			// 						data_assets: json[i].assets.join("; "),
			// 						data_stalking_horse_bid_1: json[i].stalking_horse_bid_1,
			// 						data_computation_breakup_fee_percentage_2: json[i].computation_breakup_fee_percentage_2,
			// 						focus_field: true
			// 				 });
			// 		continue;
			// 	}
			// 	for(var j = 0; j < foci.length; j++) {
			// 		if(Math.abs(xScale(json[i].computation_breakup_fee_percentage_2) - foci[j].x) < (current_radius + foci[j].radius)) {
			// 			non_foci.push({
			// 						x: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						y: h/2 + (foci[j].radius + 3)*(i%2 === 0) - (foci[j].radius + 3)*(i%2 === 1),
			// 						cx: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						cy: h/2 + (foci[j].radius + 3)*(i%2 === 0) - (foci[j].radius + 3)*(i%2 === 1),
			// 						fixed: false,
			// 						color: xColorScale(json[i].computation_breakup_fee_percentage_2),
			// 						radius: current_radius,
			// 						type: j,
			// 						data_debtor: json[i].debtor.join(" / "),
			// 						data_assets: json[i].assets.join("; "),
			// 						data_stalking_horse_bid_1: json[i].stalking_horse_bid_1,
			// 						data_computation_breakup_fee_percentage_2: json[i].computation_breakup_fee_percentage_2
			// 					  });
			// 			break;
			// 		}
			// 		if(j === foci.length - 1) {
			// 			foci.push({
			// 						x: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						y: h/2,
			// 						cx: xScale(json[i].computation_breakup_fee_percentage_2),
			// 						cy: h/2,
			// 						fixed: true,
			// 						color: xColorScale(json[i].computation_breakup_fee_percentage_2),
			// 						radius: current_radius,
			// 						type: foci.length,
			// 						data_debtor: json[i].debtor.join(" / "),
			// 						data_assets: json[i].assets.join("; "),
			// 						data_stalking_horse_bid_1: json[i].stalking_horse_bid_1,
			// 						data_computation_breakup_fee_percentage_2: json[i].computation_breakup_fee_percentage_2,
			// 						focus_field: true
			// 					 });
			// 			break;
			// 		};
			// 	}
			// }
			// nodes = foci;
			// for(var i = 0; i < non_foci.length; i++) {
			// 	nodes.push(non_foci[i]);
			// }
			// data_to_export = nodes;
			nodes = json;

			// // Build force layout
			// var force = d3.layout.force()
			// 					 .nodes(nodes)
			// 					 .size([w, h])
			// 					 .gravity(0)
			// 					 .charge(0)
			// 					 .on("tick", tick)
			// 					 .start();

			var circle = svg.selectAll("circle")
							.data(nodes)
							.enter()
							.append("svg:circle")
							// .attr("class", "force-layout-circle")
							.attr("r", function(d) { return d.radius; })
							.attr("cx", function(d) { return d.x; }) // For loading static data
							.attr("cy", function(d) { return d.y; }) // For loading static data
							.style("fill", function(d) { return d.color; })
							// .call(force.drag)
							.on("mouseenter", function(d) {

								var thisCircle = d3.select(this);
								
								thisCircle.style({ "stroke":"#000028", "stroke-width":"3" });

								// Get this bar's x/y values, then augment for the tooltip
								var xPosition = parseFloat(thisCircle.attr("cx")) + margin.left - 100;
								if(parseFloat(thisCircle.attr("cy")) <= h/2) {
									var yPosition = margin.top + Number(parseFloat(thisCircle.attr("cy"))) + Number(d.radius) + 8;
									var bottom_or_top = "top";
								} else if(parseFloat(thisCircle.attr("cy")) >= h/2) {
									var yPosition = margin.bottom + h - Number(parseFloat(thisCircle.attr("cy"))) + Number(d.radius) + 8;
									var bottom_or_top = "bottom";
								};
								
								// Update the tooltip position and value
								d3.select("#sale_details2")
								  .style("left", xPosition + "px")
								  .style("top", null)
								  .style(bottom_or_top, yPosition + "px");
								
								d3.select("#debtor2")
								  .text(d.data_debtor);
								d3.select("#assets2")
								  .text(d.data_assets);
								d3.select("#stalking_horse_bid2")
								  .text(f2[1](d.data_stalking_horse_bid_1));
								d3.select("#breakup_fee2")
								  .text(f2[0](d.data_computation_breakup_fee_percentage_2));

								// Display the tooltip and give it an appropriate height
								d3.select("#sale_details2").style("display", "block");
								var table_height = $("#sale_details_table2").height();
								$("#sale_details2").height(table_height + 2);

							})
							.on("mouseleave", function(d) {
								d3.select(this).style({ "stroke":null, "stroke-width":null });
								d3.select("#sale_details2").style("display", "none");
							});
			
			// circle.append("svg:title")
			// 	  .text( function(d, i) { return "is fixed?" + d.focus_field; } );

			// function tick(e) {
			// 	circle.each(gravity(.2 * e.alpha))
			// 		  .each(collide(.5))
			// 		  .attr("cx", function(d) { return d.x; })
			// 		  .attr("cy", function(d) { return d.y; });
			// };

			// function gravity(alpha) {
			// 	return function(d) {
			// 		d.y += (d.cy - d.y) * alpha;
			// 		d.x += (d.cx - d.x) * alpha;
			// 	};
			// }

		});

		// function collide(alpha) {
		// 	var padding = 6,
		// 		maxRadius = 12,
		// 		quadtree = d3.geom.quadtree(nodes);
		// 	return function(d) {
		// 		var r = d.radius + maxRadius + padding,
		// 		nx1 = d.x - r,
		// 		nx2 = d.x + r,
		// 		ny1 = d.y - r,
		// 		ny2 = d.y + r;
		// 		quadtree.visit(function(quad, x1, y1, x2, y2) {
		// 			if (quad.point && (quad.point !== d)) {
		// 				var x = d.x - quad.point.x,
		// 				y = d.y - quad.point.y,
		// 				l = Math.sqrt(x * x + y * y),
		// 				r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
		// 				if (l < r) {
		// 					l = (l - r) / l * alpha;
		// 					d.x -= x *= l;
		// 					d.y -= y *= l;
		// 					quad.point.x += x;
		// 					quad.point.y += y;
		// 				}
		// 			}
		// 			return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		// 		});
		// 	};
		// }

	}

});
// END Breakup fee versus stalking horse bid comparison

// 363 sale market share comparison
$(document).ready(function() {

	if($('#debtor_counsel_market_share').length) {

		var m3 = {top: 288, right: 884.352/2, bottom: 288, left: 884.352/2},
			r3 = Math.min(m3.top, m3.right, m3.bottom, m3.left) - 16;

		var f3 = [];
		    f3[0] = d3.format(".1%");
		    f3[1] = d3.format("$,.0");

		var hue = d3.scale.category10();
		var luminance = d3.scale.sqrt()
								.domain([0, 1e6])
								.clamp(true)
								.range([90, 20]);

		// Build visualization container
		var svg = d3.select("#debtor_counsel_market_share").append("svg:svg")
					.attr("width", m3.left + m3.right)
					.attr("height", m3.top + m3.bottom)
					.style("display", "block")
				.append("g")
					.attr("id", "container")
					.attr("transform", "translate(" + m3.left + "," + m3.top + ")");

		// Build partition layout
		var partition = d3.layout.partition()
						  .size([2 * Math.PI, r3]);

		// Configure foreground arcs
		var arc = d3.svg.arc()
					.startAngle(function(d) { return d.x; })
					.endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
					.innerRadius(function(d) { return r3/6 * (3*(d.depth===1) + 5*(d.depth===2)); })
					.outerRadius(function(d) { return r3/6 * (4*(d.depth===1) + 6*(d.depth===2)); });

		var startMessage = $("#start_message");
		var saleDetails = $("#sale_details3");

		// Build legend
		var legend = d3.select("#debtor_counsel_market_share").append("svg:svg")
					   .attr("height", 25)
					   .attr("width", 884.352)
					   .attr("class", "legend")
					   .style("display", "block");
		legend.append("text")
				  .attr("x", 116 / 2)
				  .attr("y", 14)
				  .attr("text-anchor", "middle")
				  .text("LEGEND:");
		legend.append("text")
			  .attr("x", 116)
			  .attr("y", 8)
			  .append("tspan")
				.text("Each sector of the ")
			  .append("tspan")
				.style("font-weight", "bold")
				.text("INNER RING ")
			  .append("tspan")
				.style("font-weight", "normal")
				.text("represents the total value of all §363 sales run by a particular law firm as a percentage of the total value of all §363 sales.");
		legend.append("text")
			  .attr("x", 116)
			  .attr("y", 20)
			  .append("tspan")
				.text("Each sector of the ")
			  .append("tspan")
				.style("font-weight", "bold")
				.text("OUTER RING ")
			  .append("tspan")
				.style("font-weight", "normal")
				.text("represents the value of a particular §363 sale as a percentage of the total value of all §363 sales.");

		var total = document.getElementById("total_value_of_sales").innerHTML;

		d3.json("/data_pages/data_sunburst_static.json", function(error, root) {

			// Print data load error
			if(error) console.log(error);

			// data = root;

			// var newData = {"name": "root", "children": {}}

			// data.forEach(function (d) {
			// 	if (typeof newData.children[d.debtor_counsel[0]] !== 'undefined') {
			// 		newData.children[d.debtor_counsel[0]].children.push(d)
			// 	} else {
			// 		newData.children[d.debtor_counsel[0]] = {"name": d.debtor_counsel[0], "children": [d]}
			// 	}
			// })
			// newData.children = Object.keys(newData.children).map(function (key) {
			// 	return newData.children[key];
			// });

			// root = newData;

			// console.log(JSON.stringify(root))

			partition.value(function(d) { return d.winning_bid_1/10000; })
					 .nodes(root)
					 .forEach(function(d) {
						d._children = d.children;
						d.sum = d.value;
						d.key = key(d);
						d.fill = fill(d);
					 });

			// Now redefine the value function to use the previously-computed sum.
			// partition.children(function(d, depth) { return depth < 2 ? d._children : null; })
			// 		 .value(function(d) { return d.sum; });
			// console.log(partition.nodes(root).slice(1))
			var path = svg.selectAll("path .chunks")
						  .data(partition.nodes(root).slice(1))
						  .enter()
						.append("path")
						  .attr("d", arc)
						  .style("fill", function(d) { return d.fill; })
						  .on("mouseenter", mouseenter)
						  .on("mouseleave", function() { d3.select(this).style({ "stroke":null, "stroke-width":null }); });

			function mouseenter(d) {
				svg.selectAll("text").remove();
				startMessage.css("visibility", "hidden");
				d3.select(this).style({ "stroke":"#000028", "stroke-width":"1.5" });
				if(d.name) {
					var marketShareLabel = svg.append("svg:text")
											  .attr("x", 0)
											  .attr("y", 0)
											  .attr("class", "chart3_bigtext")
											  .text(f3[0](d.value*10000/total));
					var firmLabel = svg.append("svg:text")
									   .attr("x", 0)
									   .attr("y", 63)
									   .attr("class", "chart3_smalltext")
									   .text(d.name);
				} else {
					var marketShareLabel = svg.append("svg:text")
											  .attr("x", 0)
											  .attr("y", 103)
											  .attr("class", "chart3_mediumtext")
											  .text(f3[0](d.value*10000/total));
					d3.select("#debtor3")
					  .text(d.debtor.join(" / "));
					d3.select("#assets3")
					  .text(d.assets.join("; "));
					d3.select("#winning_bid3")
					  .text(f3[1](d.winning_bid_1));
					d3.select("#debtor_counsel3")
					  .text(d.debtor_counsel[0]);
					saleDetails.css("visibility", "visible");
				}
			}

		});

		// Build background arcs
		var backgroundArc1 = d3.svg.arc()
								   .startAngle(0)
								   .endAngle(2 * Math.PI)
								   .innerRadius(r3 / 2)
								   .outerRadius(r3 * 2 / 3);
		var backgroundArc2 = d3.svg.arc()
								   .startAngle(0)
								   .endAngle(2 * Math.PI)
								   .innerRadius(r3 * 5 / 6)
								   .outerRadius(r3);
		var backgroundArc1 = svg.append("path")
								.attr("class", "chart3_backgroundarc")
    							.attr("d", backgroundArc1);
    	var backgroundArc1 = svg.append("path")
    							.attr("class", "chart3_backgroundarc")
    							.attr("d", backgroundArc2);
    	function mouseleave(d) {
			svg.selectAll("text").remove();
			startMessage.css("visibility", "visible");
			saleDetails.css("visibility", "hidden");

		}
    	d3.select("#container").on("mouseleave", mouseleave);

		function fill(d) {
			var p = d;
			while (p.depth > 1) p = p.parent;
			var c = d3.lab(hue(p.name));
			c.l = luminance(d.sum);
			return c;
		}

		function key(d) {
			var k = [], p = d;
			while (p.depth) k.push(p.name), p = p.parent;
			return k.reverse().join(".");
		}

		d3.select(self.frameElement).style("height", m3.top + m3.bottom + "px");

	};

});