
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class MyBanner extends CGFobject{
	constructor(scene) {
		super(scene);
		
		this.plane = new MyPlane(this.scene, 20);

		this.banner_texture = new CGFtexture(this.scene, "images/yoda_flag.png");

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.material.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material.setShininess(10.0);
		this.material.setTexture(this.banner_texture);
		
		this.shader = new CGFshader(this.scene.gl, "shaders/banner.vert", "shaders/banner.frag");
		this.shader.setUniformsValues({ uSamplerBanner: 1 });
		
		this.phase = 0;
		this.previousTime = 0;

		this.initBuffers();
	}
	initBuffers() {
		this.plane.initBuffers();
	}

	update(t, speed) {
		if (this.previousTime == 0)
			this.previousTime = t;
		
		var deltaTime = (t - this.previousTime) / 1000;
		var deltaX = (speed + 0.1) * deltaTime * 10.0;
		this.phase += deltaX;
		this.shader.setUniformsValues({phase: this.phase});
		this.previousTime = t;
	}

	reset() {
		this.phase = 0;
		this.previousTime = 0;
	}

	display() {
		this.scene.setActiveShader(this.shader);
		this.material.apply();
		this.banner_texture.bind(1);

		this.shader.setUniformsValues({ isInverted: false });
		
		this.scene.pushMatrix();
		this.scene.translate(0, 0, -1.7);
		this.scene.rotate(Math.PI/2, 0, 1, 0);
		this.scene.scale(1.2, 0.4, 1);
		this.plane.display();
		this.scene.popMatrix();

		this.shader.setUniformsValues({ isInverted: true });

		this.scene.pushMatrix();
		this.scene.translate(0, 0, -1.7);
		this.scene.rotate(-Math.PI/2, 0, 1, 0);
		this.scene.scale(1.2, 0.4, 1);
		this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);
	}
}
