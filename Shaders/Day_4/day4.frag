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

mat2 m = mat2(0.8, 0.6,-0.6,0.8);

float fbm(vec2 p) {
  float f = .0;
  f += 0.5 * noise(p) ; p*=2.02;
  f += 0.25 * noise(p) ; p*=2.03;
  f += 0.125 * noise(p) ; p*=2.01;
  f += 0.0625 * noise(p) ; p*=2.04;
  f /= 0.9375;
  return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec2 p = -1. + 2.0*uv;
    p.x *= u_resolution.x/u_resolution.y;

    float r = sqrt(dot(p,p));
    float a = atan(p.y,p.x);

    vec3 col = vec3(1.);

    if (r < .8){
      col = vec3(.2,.3,.4);
      float f = fbm(5.*p);
      col = mix(col,vec3(.2,.5,.4),f);
    }

    gl_FragColor = vec4(col,1.0);

}