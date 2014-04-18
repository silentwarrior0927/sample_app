(function() {

  // Inspired by http://informationandvisualization.de/blog/box-plot
  d3.box = function() {
    var width = 1,
        height = 1,
        duration = 0,
        domain = null,
        value = Number,
        whiskers = boxWhiskers,
        quartiles = boxQuartiles,
        tickFormat = null;

    // For each small multiple…
    function box(g) {
      g.each(function(d, i) {

        // This section added by xyz
        function getPropertyToPlot(json) {
          var prop = json.computation_breakup_fee_percentage_2;
          return prop;
        }
        var d_json = d;
        var d = d.map(getPropertyToPlot)

        d = d.map(value).sort(d3.ascending);
        var g = d3.select(this),
            n = d.length,
            min = d[0],
            max = d[n - 1];

        // This section added by xyz
        // Compute array of bin intervals
        var bin_size = 0.002;
        var bin_intervals = [[-bin_size, 0, 0]];
        var i = 1;
        while( (i - 1)*bin_size < max ) {
          bin_intervals[i] = [ (i - 1)*bin_size, i*bin_size, (i - 0.5)*bin_size];
          if( i*bin_size >= max ) bin_intervals[i] = [ (i - 1)*bin_size, max, max];
          i++;
        };
        // Determine the number of values in each bin
        var d_to_bins = [[]];
        for(var i = 0; i < d.length; i++) {
          for(var j = 0; j < bin_intervals.length; j++) {
            if(d[i] > bin_intervals[j][0] && d[i] <= bin_intervals[j][1]) {
              if(!d_to_bins[j]) d_to_bins[j] = [d[i]];
              else(d_to_bins[j].push(d[i]));
            }
          }
        }

        // Compute quartiles. Must return exactly 3 elements.
        var quartileData = d.quartiles = quartiles(d);

        // Compute whiskers. Must return exactly 2 elements, or null.
        var whiskerIndices = whiskers && whiskers.call(this, d, i),
            whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

        // Compute outliers. If no whiskers are specified, all data are "outliers".
        // We compute the outliers as indices, so that we can join across transitions!
        var outlierIndices = whiskerIndices
            ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
            : d3.range(n);

        // Compute the new x-scale.
        var x1 = d3.scale.linear()
            .domain(domain && domain.call(this, d, i) || [min, max])
            .range([height, 0]);

        // Retrieve the old x-scale, if this is an update.
        var x0 = this.__chart__ || d3.scale.linear()
            .domain([0, Infinity])
            .range(x1.range());

        // Stash the new scale.
        this.__chart__ = x1;

        // Note: the box, median, and box tick elements are fixed in number,
        // so we only have to handle enter and update. In contrast, the outliers
        // and other elements are variable, so we need to exit them! Variable
        // elements also fade in and out.

        // Update center line: the vertical line spanning the whiskers.
        var center = g.selectAll("line.center")
            .data(whiskerData ? [whiskerData] : []);

        center.enter().insert("line", "rect")
            .attr("class", "center")
            .attr("x1", width / 2)
            .attr("y1", function(d) { return x0(d[0]); })
            .attr("x2", width / 2)
            .attr("y2", function(d) { return x0(d[1]); })
            .style("opacity", 1e-6)
          .transition()
            .duration(duration)
            .style("opacity", 1)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); });

        center.transition()
            .duration(duration)
            .style("opacity", 1)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); });

        center.exit().transition()
            .duration(duration)
            .style("opacity", 1e-6)
            .attr("y1", function(d) { return x1(d[0]); })
            .attr("y2", function(d) { return x1(d[1]); })
            .remove();

        // Update innerquartile box.
        var box = g.selectAll("rect.box")
            .data([quartileData]);

        box.enter().append("rect")
            .attr("class", "box")
            .attr("x", 0)
            .attr("y", function(d) { return x0(d[2]); })
            .attr("width", width)
            .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
          .transition()
            .duration(duration)
            .attr("y", function(d) { return x1(d[2]); })
            .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

        box.transition()
            .duration(duration)
            .attr("y", function(d) { return x1(d[2]); })
            .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

        // Update median line.
        var medianLine = g.selectAll("line.median")
            .data([quartileData[1]]);

        medianLine.enter().append("line")
            .attr("class", "median")
            .attr("x1", 0)
            .attr("y1", x0)
            .attr("x2", width)
            .attr("y2", x0)
          .transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1);

        medianLine.transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1);

        // Update whiskers.
        var whisker = g.selectAll("line.whisker")
            .data(whiskerData || []);

        whisker.enter().insert("line", "circle, text")
            .attr("class", "whisker")
            .attr("x1", 0)
            .attr("y1", x0)
            .attr("x2", width)
            .attr("y2", x0)
            .style("opacity", 1e-6)
          .transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

        whisker.transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1);

        whisker.exit().transition()
            .duration(duration)
            .attr("y1", x1)
            .attr("y2", x1)
            .style("opacity", 1e-6)
            .remove();

        // // Update outliers.
        // var outlier = g.selectAll("circle.outlier")
        //     .data(outlierIndices, Number);

        // outlier.enter().insert("circle", "text")
        //     .attr("class", "outlier")
        //     .attr("r", 5)
        //     .attr("cx", width / 2)
        //     .attr("cy", function(i) { return x0(d[i]); })
        //     .style("opacity", 1e-6)
        //   .transition()
        //     .duration(duration)
        //     .attr("cy", function(i) { return x1(d[i]); })
        //     .style("opacity", 1);

        // outlier.transition()
        //     .duration(duration)
        //     .attr("cy", function(i) { return x1(d[i]); })
        //     .style("opacity", 1);

        // outlier.exit().transition()
        //     .duration(duration)
        //     .attr("cy", function(i) { return x1(d[i]); })
        //     .style("opacity", 1e-6)
        //     .remove();

        // Compute the tick format.
        // Next line modified by xyz
        var format = d3.format(".2%");


        // Update box ticks.
        var boxTick = g.selectAll("text.box")
            .data(quartileData);

        boxTick.enter().append("text")
            .attr("class", "box")
            .attr("dy", ".3em")
            .attr("dx", function(d, i) { return i & 1 ? 6 : -6 })
            .attr("x", function(d, i) { return i & 1 ? width : 0 })
            .attr("y", x0)
            .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
            .text(format)
            .style("fill", "#7f7f7f")                   // Line added by xyz
            .style("font-family", "Arial, sans-serif")  // Line added by xyz
          .transition()
            .duration(duration)
            .attr("y", x1);

        boxTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1);

        // Update whisker ticks. These are handled separately from the box
        // ticks because they may or may not exist, and we want don't want
        // to join box ticks pre-transition with whisker ticks post-.
        var whiskerTick = g.selectAll("text.whisker")
            .data(whiskerData || []);

        whiskerTick.enter().append("text")
            .attr("class", "whisker")
            .attr("dy", ".3em")
            .attr("dx", 6)
            .attr("x", width)
            .attr("y", x0)
            .text(format)
            .style("opacity", 1e-6)
            .style("fill", "#7f7f7f")                   // Line added by xyz
            .style("font-family", "Arial, sans-serif")  // Line added by xyz
          .transition()
            .duration(duration)
            .attr("y", x1)
            .style("opacity", 1);

        whiskerTick.transition()
            .duration(duration)
            .text(format)
            .attr("y", x1)
            .style("opacity", 1);

        whiskerTick.exit().transition()
            .duration(duration)
            .attr("y", x1)
            .style("opacity", 1e-6)
            .remove();

        // This section added by xyz
        var scatter = g.selectAll("circle") 
                       .data(d_json)
                       .enter()
                       .append("circle")
                       .attr("cx",
                              function(d) {
                                var d_to_bins_local = d_to_bins;
                                for(var i = 0; i < bin_intervals.length; i++) {
                                  if(d.computation_breakup_fee_percentage_2 > bin_intervals[i][0] && d.computation_breakup_fee_percentage_2 <= bin_intervals[i][1]) {
                                    for(var j = 0; j < d_to_bins_local[i].length; j++) {
                                      if(d.computation_breakup_fee_percentage_2 >= d_to_bins_local[i][j] - 0.0000001 && d.computation_breakup_fee_percentage_2 <= d_to_bins_local[i][j] + 0.0000001) {
                                        d_to_bins_local[i][j] = -1;
                                        return width/2 + j*width/8;
                                      }
                                    }
                                  }
                                }
                                return 0;
                            })
                       .attr("cy", function(d) {
                                      for(var i = 0; i < bin_intervals.length; i++) {
                                        if(d.computation_breakup_fee_percentage_2 > bin_intervals[i][0] && d.computation_breakup_fee_percentage_2 <= bin_intervals[i][1]) {
                                          return x1(bin_intervals[i][2])
                                        }
                                      }
                                      return x1(d.computation_breakup_fee_percentage_2);
                                    })
                       .attr("r", 3)
                       .style("fill", "#ff9d40")
                       .style("stroke", "#000028")
                       .style("stroke-width", "1")
                       .append("svg:title")
                       .text( function(d, i) { return "My color is " + d.computation_breakup_fee_percentage_2; } );

      });
      d3.timer.flush();
    }

    box.width = function(x) {
      if (!arguments.length) return width;
      width = x;
      return box;
    };

    box.height = function(x) {
      if (!arguments.length) return height;
      height = x;
      return box;
    };

    box.tickFormat = function(x) {
      if (!arguments.length) return tickFormat;
      tickFormat = x;
      return box;
    };

    box.duration = function(x) {
      if (!arguments.length) return duration;
      duration = x;
      return box;
    };

    box.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x == null ? x : d3.functor(x);
      return box;
    };

    box.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return box;
    };

    box.whiskers = function(x) {
      if (!arguments.length) return whiskers;
      whiskers = x;
      return box;
    };

    box.quartiles = function(x) {
      if (!arguments.length) return quartiles;
      quartiles = x;
      return box;
    };

    return box;
  };

  function boxWhiskers(d) {
    return [0, d.length - 1];
  }

  function boxQuartiles(d) {
    return [
      d3.quantile(d, .25),
      d3.quantile(d, .5),
      d3.quantile(d, .75)
    ];
  }

})();