// Breakup fee by judge comparison

$(document).ready(function() {

	if($('#breakup_fee_comparison_by_judge').length) {

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

		var margin = {top: 10, right: 116, bottom: 116, left: 116},
		    width = 293 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;
		$("#breakup_fee_comparison_by_judge").css("height", height + margin.top + margin.bottom);

		var min = Infinity,
		    max = -Infinity;

		var chart = d3.box()
		    .whiskers(iqr(1.5))
		    .width(width)
		    .height(height);

		d3.json("/data_pages/sales_in_json.json", function(error, json) {
			
			var data = [];

			// Determine number of sales that each judge presided over
			var num_judges = Math.max.apply(Math, json.map( function(o) {return o.computation_judge_code;} )) + 1;
			var sales_per_judge = []
			for(var i = 0; i < num_judges; i++) {
				sales_per_judge[i] = 0;
			}
			for(var i = 0; i < json.length; i++) {
				sales_per_judge[json[i].computation_judge_code]++; 
			}

			// Determine which judges presided over fewer than numsales_lowerlimit sales
			var numsales_lowerlimit = 5;
			var index_of_numsales_lowerlimit = -1 ;
			for(var i = 0; i < sales_per_judge.length; i++) {
				if(sales_per_judge[i] < numsales_lowerlimit) {
					index_of_numsales_lowerlimit = i;
					break;
				}
			}

			// Build data array & find min and max of data
			for(var i = 0; i < json.length; i++) {
				
				var breakup_fee_current = json[i].computation_breakup_fee_percentage_2
				if(sales_per_judge[json[i].computation_judge_code] < numsales_lowerlimit) {
					var judge = index_of_numsales_lowerlimit; // "other" judge
				} else {
					var judge = json[i].computation_judge_code;
				}
				if (!data[judge]) {
					// data is an array of arrays
					data[judge] = [json[i]];
				}
				else data[judge].push(json[i]);
				
				if (breakup_fee_current > max) max = breakup_fee_current;
				if (breakup_fee_current < min) min = breakup_fee_current;
			}

			chart.domain([min, max]);

			var bw_plots = d3.select("#breakup_fee_comparison_by_judge").selectAll("svg")
								  .data(data)	
								  .enter()
								  .append("svg")

								  .attr("class", "box")
								  .attr("width", width + margin.left + margin.right)
								  .attr("height", height + margin.bottom + margin.top)
								  // .style("border", "1px solid red")
								  .style("display", "block")
								  .style("float", "left")
								  
								  .append("g")
								  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								  .call(chart);

		});

	}

});
// END Breakup fee by judge comparison

// Breakup fee versus consideration comparison
$(document).ready(function() {

	if($('#breakup_fee_versus_consideration').length) {

		var margin = {top: 10, right: 116, bottom: 10, left: 116};
			w = 884.352 - margin.left - margin.right,
			h = 400 - margin.top - margin.bottom;

		// Build visualization container
		var svg = d3.select("#breakup_fee_versus_consideration").append("svg:svg")
																.attr("width", w + margin.left + margin.right)
																.attr("height", h + margin.top + margin.bottom)
																.style("display", "block")
																// .style("border", "1px solid red")
															.append("g")
																.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Format numbers
		var f2 = d3.format(".1%");

		d3.json("/data_pages/sales_in_json.json", function(error, json) {
			
			// Print data load error
			if(error) console.log(error);

			// Build scale & axis
			var max = d3.max(json, function(d) {return d.computation_breakup_fee_percentage_2})
			var xScale = d3.scale.linear()
						   .domain([0, max])
						   .range([0, w]);
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .tickFormat(f2);
			// Display axis
			svg.append("g")
			   .attr("class", "axis")
			   .call(xAxis);

			// Build data points
			var foci = [];
			var non_foci = [];
			for(var i = 0; i < json.length; i++) {
				var current_radius = Math.sqrt(json[i].stalking_horse_bid_1/(100000*Math.PI));
				if(foci.length === 0) {
					foci.push({
									x: xScale(json[i].computation_breakup_fee_percentage_2),
									y: h/2,
									cx: xScale(json[i].computation_breakup_fee_percentage_2),
									cy: h/2,
									fixed: true,
									radius: current_radius,
									type: foci.length,
									data: json[i],
									focus_field: json[i].computation_breakup_fee_percentage_2
							 });
					continue;
				}
				for(var j = 0; j < foci.length; j++) {
					if(Math.abs(xScale(json[i].computation_breakup_fee_percentage_2) - foci[j].x) < (current_radius + foci[j].radius)) {
						non_foci.push({
									x: xScale(json[i].computation_breakup_fee_percentage_2),
									y: h/2 + (foci[j].radius + 3)*(i%2 === 0) - (foci[j].radius + 3)*(i%2 === 1),
									cx: xScale(json[i].computation_breakup_fee_percentage_2),
									cy: h/2 + (foci[j].radius + 3)*(i%2 === 0) - (foci[j].radius + 3)*(i%2 === 1),
									fixed: false,
									radius: current_radius,
									type: j,
									data: json[i]
								  });
						break;
					}
					if(j === foci.length - 1) {
						foci.push({
									x: xScale(json[i].computation_breakup_fee_percentage_2),
									y: h/2,
									cx: xScale(json[i].computation_breakup_fee_percentage_2),
									cy: h/2,
									fixed: true,
									radius: current_radius,
									type: foci.length,
									data: json[i],
									focus_field: json[i].computation_breakup_fee_percentage_2
								 });
						break;
					};
				}
			}
			nodes = foci;
			for(var i = 0; i < non_foci.length; i++) {
				nodes.push(non_foci[i]);
			}

			// Build force layout
			var force = d3.layout.force()
								 .nodes(nodes)
								 .size([w, h])
								 .gravity(0)
								 .charge(0)
								 .on("tick", tick)
								 .start();

			var circle = svg.selectAll("circle")
							.data(nodes)
							.enter()
							.append("svg:circle")
							// .attr("class", "force-layout-circle")
							.attr("r", function(d) {return d.radius});
							// .call(force.drag);
			
			circle.append("svg:title")
				  .text( function(d, i) { return "My color is " + d.data.computation_breakup_fee_percentage_2 + " type is " + d.type + " buf value is " + d.focus_field; } );

			function tick(e) {
				circle.each(gravity(.2 * e.alpha))
					  .each(collide(.5))
					  .attr("cx", function(d) { return d.x; })
					  .attr("cy", function(d) { return d.y; });
			};

			function gravity(alpha) {
				return function(d) {
					d.y += (d.cy - d.y) * alpha;
					d.x += (d.cx - d.x) * alpha;
				};
			}

		});

		function collide(alpha) {
			var padding = 6,
				maxRadius = 12,
				quadtree = d3.geom.quadtree(nodes);
			return function(d) {
				var r = d.radius + maxRadius + padding,
				nx1 = d.x - r,
				nx2 = d.x + r,
				ny1 = d.y - r,
				ny2 = d.y + r;
				quadtree.visit(function(quad, x1, y1, x2, y2) {
					if (quad.point && (quad.point !== d)) {
						var x = d.x - quad.point.x,
						y = d.y - quad.point.y,
						l = Math.sqrt(x * x + y * y),
						r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
						if (l < r) {
							l = (l - r) / l * alpha;
							d.x -= x *= l;
							d.y -= y *= l;
							quad.point.x += x;
							quad.point.y += y;
						}
					}
					return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
				});
			};
		}

	}

});
// END Breakup fee versus consideration comparison

$(document).ready(function() {

	if($('#debtor_counsel_market_share').length) {

		var m3 = {top: 288, right: 884.352/2, bottom: 288, left: 884.352/2},
		r3 = Math.min(m3.top, m3.right, m3.bottom, m3.left) - 16;

		var hue = d3.scale.category10();
		var luminance = d3.scale.sqrt()
								.domain([0, 1e6])
								.clamp(true)
								.range([90, 20]);

		// Build visualization container
		var svg = d3.select("#debtor_counsel_market_share").append("svg")
					.attr("width", m3.left + m3.right)
					.attr("height", m3.top + m3.bottom)
					.style("display", "block")
				.append("g")
					.attr("transform", "translate(" + m3.left + "," + m3.top + ")");

		var partition = d3.layout.partition()
						  .size([2 * Math.PI, r3]);

		var arc = d3.svg.arc()
					.startAngle(function(d) { return d.x; })
					.endAngle(function(d) { return d.x + d.dx - .01 / (d.depth + .5); })
					.innerRadius(function(d) { return r3/6 * (3*(d.depth===1) + 5*(d.depth===2)); })
					.outerRadius(function(d) { return r3/6 * (4*(d.depth===1) + 6*(d.depth===2)); });

		var f3 = d3.format(".1%");

		d3.json("/data_pages/sales_in_json.json", function(error, root) {

			var total = d3.sum(root, function(d) { return d.stalking_horse_bid_1 });

			var data = root;

			var newData = {"name": "root", "children": {}}

			data.forEach(function (d) {
				if (typeof newData.children[d.debtor_counsel[0]] !== 'undefined') {
					newData.children[d.debtor_counsel[0]].children.push(d)
				} else {
					newData.children[d.debtor_counsel[0]] = {"name": d.debtor_counsel[0], "children": [d]}
				}
			})
			newData.children = Object.keys(newData.children).map(function (key) {
				return newData.children[key];
			});

			root = newData;

			partition.value(function(d) { return d.stalking_horse_bid_1/10000; })
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
			var path = svg.selectAll("path")
						  .data(partition.nodes(root).slice(1))
						  .enter()
						.append("path")
						  .attr("d", arc)
						  .style("fill", function(d) { return d.fill; })
						  .on("mouseenter", mouseenter)
						  .on("mouseleave", mouseleave);

			function mouseenter(d) {
				$("#start_message").css("visibility", "hidden");
				if(d.name) {
					svg.append("svg:text")
					   .attr("x", function(d) { return 0; })
					   .attr("y", function(d) { return 0; })
					   .attr("text-anchor", "middle")
					   .attr("fill", "#7f7f7f")
					   .attr("font-family", "Franklin Gothic Book, 'franklin_gothic_bookregular', sans-serif")
					   .attr("font-size", "88px")
					   .text(f3(d.value*10000/total));
					svg.append("svg:text")
					   .attr("x", function(d) { return 0; })
					   .attr("y", function(d) { return 63; })
					   .attr("text-anchor", "middle")
					   .attr("fill", "#7f7f7f")
					   .attr("font-family", "Arial, sans-serif")
					   .attr("font-size", "14px")
					   .text(d.name);
				} else {
					svg.append("svg:text")
					   .attr("x", function(d) { return 0; })
					   .attr("y", function(d) { return 63; })
					   .attr("text-anchor", "middle")
					   .attr("fill", "#7f7f7f")
					   .attr("font-family", "Arial, sans-serif")
					   .attr("font-size", "14px")
					   .text(d.debtor_counsel[0]);
				}
			}

			function mouseleave(d) {
				svg.selectAll("text").remove();
				$("#start_message").css("visibility", "visible")
			}

		});

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