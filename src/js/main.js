(function() {
  buildWelcome();
  headerAnchors();

  function headerAnchors() {
    var navAnchors = document.querySelectorAll('.site-nav a');
    Array.prototype.forEach.call(navAnchors, function(el) {
      el.addEventListener('click', navToElement, false);
    });

    function navToElement(e) {
      e.preventDefault();
      var ele = document.getElementById(this.hash.slice(1));

      d3.select('.parallax')
        .transition()
          .duration(1000)
          .tween('scrollTween', scrollTopTween(ele.parentNode.offsetTop));
    }
  }

  function scrollTopTween(scrollTop) {
    return function() {
      var i = d3.interpolateNumber(this.scrollTop, scrollTop);
      return function(t) { this.scrollTop = i(t); };
   };
  }

  function buildWelcome() {
    var svg = d3.select('.welcome');

    var width = parseInt(svg.style('width'));
    var height = parseInt(svg.style('height'));

    var border = svg.append('path')
      .attr('class', 'border')
      .attr('d', function() {
        var cornerSize = 30;
        var space = 200;
        var commands = [];
        commands.push('M0,' + cornerSize); // M0,30
        commands.push(' A' + cornerSize + ' ' + cornerSize + ' 0 0 0 ' + cornerSize + ' ' + 0); // A 30 30 0 0 0 30 0
        commands.push(' L' + (width - cornerSize) + ',' + 0); // L 370 0
        commands.push(' A' + cornerSize + ' ' + cornerSize + ' 0 0 0 ' + width + ' ' + cornerSize); // A 30 30 0 0 0 400 30
        commands.push(' L' + width + ',' + (height - cornerSize)); // L 400 370
        commands.push(' A' + cornerSize + ' ' + cornerSize + ' 0 0 0 ' + (width - cornerSize) + ' ' + height); // A 30 30 0 0 0 370 400
        commands.push(' L' + cornerSize + ',' + height); // L 30 400
        commands.push(' A' + cornerSize + ' ' + cornerSize + ' 0 0 0 ' + 0 + ' ' + (height - cornerSize)); // A 30 30 0 0 0 0 370
        commands.push(' Z'); // Z
        return commands.join('');
      });

    var length = border.node().getTotalLength();
    border
      .attr('stroke-dasharray', length + ' ' + length)
      .attr('stroke-dashoffset', length)
      .transition()
        .duration(1500)
        .delay(500)
        .ease('linear')
        .attr('stroke-dashoffset', 0);

    svg.selectAll('text')
      .transition()
      .duration(1000)
      .delay(2000)
      .attr('opacity', 1);
  }
})();