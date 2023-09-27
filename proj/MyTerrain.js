/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.plane = new MyPlane(this.scene, 20);

        this.textureTerrain = new CGFtexture(this.scene, "images/mountain.png");
        this.textureHeightMap = new CGFtexture(this.scene, "images/heightmap.jpg");

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.material.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.material.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.material.setShininess(10.0);
        this.material.setTexture(this.textureTerrain);
        
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.shader.setUniformsValues({ uSamplerTerrain: 1 });
		this.shader.setUniformsValues({ uSamplerHeightMap: 2 });

        this.initBuffers();
    }
    
    initBuffers() {
        this.plane.initBuffers();
    }
    
    display() {
        this.scene.setActiveShader(this.shader);

        this.material.apply();
        this.textureTerrain.bind(1);
        this.textureHeightMap.bind(2);

        this.scene.pushMatrix();
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
    
    updateBuffers(complexity){}
    

}
