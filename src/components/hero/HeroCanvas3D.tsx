import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Plexus Nodes Config
    const nodeCount = 120;
    const nodes: {
      pos: THREE.Vector3;
      vel: THREE.Vector3;
    }[] = [];

    const bounds = 8;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * bounds * 2,
          (Math.random() - 0.5) * bounds * 2,
          (Math.random() - 0.5) * bounds * 2
        ),
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
      });
    }

    // Nodes Buffer Geometry for points rendering
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsPositions = new Float32Array(nodeCount * 3);
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointsPositions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6, // Violet/Purple
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsObj = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointsObj);

    // Line segments connecting nodes
    const maxConnections = 350;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 4); // RGBA

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 4));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineObj = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineObj);

    // Mouse coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate group slightly based on mouse
      scene.rotation.y = mouseX * 0.25;
      scene.rotation.x = -mouseY * 0.25;

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      pointsMaterial.color.setHex(isLight ? 0x6d28d9 : 0x8b5cf6);
      
      const pr = isLight ? 0.43 : 0.54;
      const pg = isLight ? 0.16 : 0.36;
      const pb = isLight ? 0.85 : 0.96;

      // Update node positions
      const positionsArr = pointsGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.pos.add(node.vel);

        // Boundary checks
        if (Math.abs(node.pos.x) > bounds) node.vel.x *= -1;
        if (Math.abs(node.pos.y) > bounds) node.vel.y *= -1;
        if (Math.abs(node.pos.z) > bounds) node.vel.z *= -1;

        // Mouse attraction force
        const mouseVec = new THREE.Vector3(mouseX * bounds * 1.2, mouseY * bounds * 1.2, 0);
        const distToMouse = node.pos.distanceTo(mouseVec);
        if (distToMouse < 4) {
          const force = (4 - distToMouse) * 0.0012;
          const dir = new THREE.Vector3().subVectors(mouseVec, node.pos).normalize();
          node.pos.addScaledVector(dir, force);
        }

        positionsArr[i * 3] = node.pos.x;
        positionsArr[i * 3 + 1] = node.pos.y;
        positionsArr[i * 3 + 2] = node.pos.z;
      }
      pointsGeometry.attributes.position.needsUpdate = true;

      // Calculate connections
      const linePosAttr = lineGeometry.attributes.position.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].pos.distanceTo(nodes[j].pos);
          const limit = 3.2;

          if (dist < limit && lineIndex < maxConnections) {
            const alpha = (1 - dist / limit) * 0.35;

            // Start Node (Vertex 1)
            linePosAttr[lineIndex * 6] = nodes[i].pos.x;
            linePosAttr[lineIndex * 6 + 1] = nodes[i].pos.y;
            linePosAttr[lineIndex * 6 + 2] = nodes[i].pos.z;

            lineColAttr[lineIndex * 8] = pr;
            lineColAttr[lineIndex * 8 + 1] = pg;
            lineColAttr[lineIndex * 8 + 2] = pb;
            lineColAttr[lineIndex * 8 + 3] = alpha; // A

            // End Node (Vertex 2)
            linePosAttr[lineIndex * 6 + 3] = nodes[j].pos.x;
            linePosAttr[lineIndex * 6 + 4] = nodes[j].pos.y;
            linePosAttr[lineIndex * 6 + 5] = nodes[j].pos.z;

            lineColAttr[lineIndex * 8 + 4] = pr;
            lineColAttr[lineIndex * 8 + 5] = pg;
            lineColAttr[lineIndex * 8 + 6] = pb;
            lineColAttr[lineIndex * 8 + 7] = alpha; // A

            lineIndex++;
          }
        }
      }

      // Fill remaining connection arrays with zero to clear older lines
      const remainingLines = maxConnections - lineIndex;
      if (remainingLines > 0) {
        for (let i = lineIndex; i < maxConnections; i++) {
          lineColAttr[i * 8 + 3] = 0; // Set Alpha 0
          lineColAttr[i * 8 + 7] = 0;
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      pointsGeometry.dispose();
      lineGeometry.dispose();
      pointsMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="hero-canvas-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
