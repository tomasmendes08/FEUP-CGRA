/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of slices
 */
class MyCylinder extends CGFobject {
	constructor(scene, slices) {
		super(scene);
		this.slices = slices;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
        this.indices = [];

        this.normals = [];

        this.texCoords = [];
        
        var angle = 0;
        var angleInc = 2 * Math.PI / this.slices;

        var width = 1 / this.slices;

		for (var i = 0; i <= this.slices; i++, angle += angleInc) {
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.vertices.push(cos, 0, sin);
            this.vertices.push(cos, 1, sin);

            if (i < this.slices) {
                this.indices.push(2*i, (2*i+1), (2*i+3));
                this.indices.push(2*i, (2*i+3), (2*i+2));
            }

            var normal = [cos, 0, sin];
            var normalSize = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
            normal[0] /= normalSize;
            normal[1] /= normalSize;
            normal[2] /= normalSize;
            this.normals.push(...normal);
            this.normals.push(...normal);

            var coords = [1 - (i*width), 1,
                         1 - (i*width), 0];
            this.texCoords.push(...coords);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
