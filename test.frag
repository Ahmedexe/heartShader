#ifdef GL_ES
precision mediump float;
#endif

varying vec2 pos;
uniform float u_time;
uniform vec2 u_resolution;

float dot2(in vec2 v) {
    return dot(v, v);
}

float sdHeart(in vec2 p) {
    p.x = abs(p.x);

    if(p.y + p.x > 1.0)
        return sqrt(dot2(p - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
    return sqrt(min(dot2(p - vec2(0.00, 1.00)), dot2(p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
}

vec3 palette(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {

    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2. - 1.;
    uv.x *= u_resolution.x / u_resolution.y;

    uv.y += .6;
    float y = sdHeart(uv);
    float c = sin(y * 8. - u_time * 2.) / 8.;

    c = abs(c);
    c = 0.02 / c;

    vec3 col = palette(length(uv), vec3(0.098, 0.448, 0.500), vec3(0.318, 0.228, 0.188), vec3(1.388, 1.828, 0.898), vec3(0.098, 2.188, 0.667));

    col *= c;

    gl_FragColor = vec4(col, 1.);

}