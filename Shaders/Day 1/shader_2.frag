#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time; 

float random (vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(13.988,78.233)))*43758.545224958);
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x/u_resolution.y;

    vec3 col = vec3(0.);

    uv *= 5.;
    vec2 gv = fract(uv)-.5;  // get the integer coords
    vec2 id = floor(uv);  // get the fractional coords

    float rnd = random(id);

    if (rnd < .5) gv.x *= -1.;

    float width = .25;
    float d = abs(abs(gv.x+gv.y)-.5);

    vec2 c_uv = gv-.5*sign(gv.x+gv.y+.001);
    d = length(c_uv) - .5;
    float mask = smoothstep(.01,-.01,abs(d)-width);

    float angle = atan(c_uv.x,c_uv.y);   //-pi to pi
    
    float checker = mod(id.x+id.y,2.)*2.-1.;
    float flow = sin(checker*angle*40.+u_time);
    col += flow*mask;

    gl_FragColor = vec4(col,1.0);

}