"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedShaderBackground = () => {
    const containerRef = useRef(null);
    const mouseRef = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (isMobile || prefersReducedMotion) return;

        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance'
        });
        
        // Shader Material with Mouse and Scroll interaction
        const material = new THREE.ShaderMaterial({
            uniforms: {
                iTime: { value: 0 },
                iResolution: { value: new THREE.Vector2() },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uScroll: { value: 0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float iTime;
                uniform vec2 iResolution;
                uniform vec2 uMouse;
                uniform float uScroll;
                varying vec2 vUv;

                #define NUM_OCTAVES 2

                float rand(vec2 n) {
                    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
                }

                float noise(vec2 p) {
                    vec2 ip = floor(p);
                    vec2 u = fract(p);
                    u = u * u * (3.0 - 2.0 * u);
                    float res = mix(
                        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
                        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
                    return res * res;
                }

                float fbm(vec2 x) {
                    float v = 0.0;
                    float a = 0.3;
                    vec2 shift = vec2(100.0);
                    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
                    for (int i = 0; i < NUM_OCTAVES; ++i) {
                        v += a * noise(x);
                        x = rot * x * 2.0 + shift;
                        a *= 0.4;
                    }
                    return v;
                }

                void main() {
                    vec2 fragCoord = gl_FragCoord.xy;
                    // Mouse reactive distortion
                    vec2 mouseDist = uMouse - (fragCoord / iResolution.xy);
                    float dist = length(mouseDist);
                    vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005) + (mouseDist * 0.02 / (dist + 0.1));
                    
                    vec2 p = ((fragCoord + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
                    p.y += uScroll * 0.5; // Scroll reaction

                    vec2 v;
                    vec4 o = vec4(0.0);
                    float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

                    for (float i = 0.0; i < 15.0; i++) {
                        v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
                        float auroraFactor = exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
                        
                        vec4 auroraColors = vec4(
                            0.1 + 0.2 * sin(i * 0.2 + iTime * 0.4 + dist),
                            0.2 + 0.4 * cos(i * 0.3 + iTime * 0.5 - dist),
                            0.5 + 0.5 * sin(i * 0.4 + iTime * 0.3 + dist),
                            1.0
                        );
                        o += auroraColors * auroraFactor * smoothstep(0.0, 1.0, i / 15.0) * 0.5;
                    }

                    o = vec4(1.0) - exp(-2.0 * pow(max(vec4(0.0), o / 100.0), vec4(1.6)));
                    gl_FragColor = o * 1.8;
                }
            `
        });

        // Particle System
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
            velocities[i] = 0.001 + Math.random() * 0.005;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const pMaterial = new THREE.PointsMaterial({
            color: 0x38BDF8,
            size: 0.015,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(geometry, pMaterial);
        scene.add(particles);

        const planeGeometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(planeGeometry, material);
        scene.add(mesh);

        const updateSize = () => {
            const width = container.offsetWidth || window.innerWidth;
            const height = container.offsetHeight || window.innerHeight;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setSize(width, height);
            material.uniforms.iResolution.value.set(width, height);
        };
        updateSize();

        container.appendChild(renderer.domElement);

        const handleMouseMove = (e) => {
            mouseRef.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);

        let frameId;
        const animateFunc = () => {
            material.uniforms.iTime.value += 0.016;
            material.uniforms.uMouse.value.lerp(mouseRef.current, 0.05);
            material.uniforms.uScroll.value = window.scrollY / 1000;

            // Animate Particles
            const pos = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                pos[i * 3 + 1] += velocities[i] + (window.scrollY * 0.00001);
                if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animateFunc);
        };
        animateFunc();

        const handleResize = () => {
            updateSize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            pMaterial.dispose();
            planeGeometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-[#09090b]" />
    );
};

export default AnimatedShaderBackground;
