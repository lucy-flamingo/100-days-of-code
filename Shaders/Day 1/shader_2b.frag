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

    vec3 col = vec3(.0);

    uv *= 10.;
    uv -= u_time*.3;

    vec2 gv = fract(uv)-.5;  // get the integer coords
    vec2 id = floor(uv);  // get the fractional coords

    float rnd = random(id);

    if (rnd < .5) gv.x *= -1.;

    float d = 1.;
    vec2 c_uv = gv-.5*sign(gv.x+gv.y+.001);

    float width = .05;
    float r = .5;
    d = length(c_uv) - r;
    float mask = smoothstep(.01,-.01,abs(d)-width);

    r = .3;
    d = length(c_uv) - r;
    mask += smoothstep(.01,-.01,abs(d)-width);

    r = .1;
    d = length(c_uv) - r;
    mask += smoothstep(.01,-.01,abs(d)-width);

    col += mask;

    gl_FragColor = vec4(col,1.0);

}