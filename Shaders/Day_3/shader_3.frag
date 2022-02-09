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

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x/u_resolution.y;

    vec3 col = vec3(0.1);
    float t = 7.;
    t = abs(1.0-sin(u_time*.1))*7.;
    uv += noise(uv*1.)*t;

    float mask = 0.;

    mask += smoothstep(.02,.4,noise(uv*5.)); // Black splatter
    mask -= smoothstep(.35,.7,noise(uv*5.)); // Holes on splatter

    col += mix(vec3(1.0, 0.3686, 0.0),vec3(0.6784, 0.4, 1.0),mask);

    gl_FragColor = vec4(col,1.0);

}