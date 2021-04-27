// https://threejs.org/docs/index.html#api/zh/geometries/LatheGeometry
(function (_, THREE) {
    var Pie = window.Pie = function (id, data) {
      this.el = document.getElementById(id);
      this.colors = data.colors;
      this.divisions = data.divisions;
  
      this.init();
    };
  
    Pie.prototype.init = function () {
      var scene = this.scene = new THREE.Scene();
      var fov = 45; // camera's field of view
      var viewWidth = this.el.offsetWidth;
      var viewHeight = this.el.offsetHeight;
      var camera = this.camera = new THREE.PerspectiveCamera(
        fov, viewWidth / viewHeight, 1, 1000
      );
  
      var renderer;
      if (window.WebGLRenderingContext) {
        renderer = new THREE.WebGLRenderer({ antialiasing: true });
      } else {
        renderer = new THREE.CanvasRenderer();
      }
      this.renderer = renderer;
  
      renderer.setSize(viewWidth, viewHeight);
      renderer.setClearColor(0xffffff, 1); // white bg
      this.el.appendChild(renderer.domElement);
  
      var pie = this.pie = this.build();
      scene.add(pie);
  
      pie.rotation.x = Math.PI * 0.6;
  
      camera.lookAt(pie.position);
  
      // dynamically calcuate the camera position in order to fit the pie in view
      // http://stackoverflow.com/a/2866471
      //camera.position.z = pie.scale.x / Math.tan(Math.PI * fov / 360);
      camera.position.z = 6;
  
      var render = function () {
        window.requestAnimationFrame(render);
  
        pie.rotation.z += 0.005;
  
        renderer.render(scene, camera);
      };
      render();
    };
  
    Pie.prototype.build = function () {
      var pie = new THREE.Group();
      var total = 2 * Math.PI;
      var reducer = function (memo, num) { return memo + num; };
  
      // fill the first segment
      pie.add(this.buildSegment(0, total * this.divisions[0], this.colors[0]));
  
      for (var i = 1; i < this.divisions.length; i++) {
        pie.add(this.buildSegment(
          // get the sum of all radii before this
          total * _.reduce(_.first(this.divisions, i), reducer, 0),
          total * this.divisions[i],
          this.colors[i]
        ));
      }
  
      // fill the rest of the pie
      var remainder = total * _.reduce(this.divisions, reducer, 0);
      pie.add(this.buildSegment(remainder, total - remainder, _.last(this.colors)));
      return pie;
    };
  
    Pie.prototype.buildSegment = function (start, end, color) {
      var points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(0, 2, 0));
      points.push(new THREE.Vector3(0, 2, 1));
      points.push(new THREE.Vector3(0, 0, 1));
  
      var geometry = new THREE.LatheGeometry(points, 24, start, end);
      var material = new THREE.MeshBasicMaterial({ color: color });
      return new THREE.Mesh(geometry, material);
    };
  
  })(window._, window.THREE);