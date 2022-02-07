#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time; 

float random (vec2 st) {
    return fract(sin(dot(st.xy,
    vec2(12.988,78.233)))*43758.545224958);
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x/u_resolution.y;

    uv *= 10.;
    vec2 ipos = floor(uv);  // get the integer coords
    vec2 fpos = fract(uv);  // get the fractional coords

    float rnd = random(ipos);

    vec3 col = vec3(random(ipos),random(ipos+1.),random(ipos+2.));

    gl_FragColor = vec4(col,1.0);

}
