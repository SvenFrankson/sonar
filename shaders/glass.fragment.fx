precision highp float;

varying vec3 vPositionW;

uniform vec3 source1;
uniform float sqrSourceDist1;

uniform vec3 source2;
uniform float sqrSourceDist2;

uniform vec3 source3;
uniform float sqrSourceDist3;

uniform vec3 source4;
uniform float sqrSourceDist4;

void main(void) {
  float vSqrSourceDist1 = dot(source1 - vPositionW, source1 - vPositionW);
  float delta1 = sqrSourceDist1 - vSqrSourceDist1;
  float rangeTerm1 = 0.;
  if (delta1 > 0.) {
    rangeTerm1 = 1. / ((delta1 * delta1) / 8. + 1.);
  }

  float vSqrSourceDist2 = dot(source2 - vPositionW, source2 - vPositionW);
  float delta2 = sqrSourceDist2 - vSqrSourceDist2;
  float rangeTerm2 = 0.;
  if (delta2 > 0.) {
    rangeTerm2 = 1. / ((delta2 * delta2) / 8. + 1.);
  }

  float vSqrSourceDist3 = dot(source3 - vPositionW, source3 - vPositionW);
  float delta3 = sqrSourceDist3 - vSqrSourceDist3;
  float rangeTerm3 = 0.;
  if (delta3 > 0.) {
    rangeTerm3 = 1. / ((delta3 * delta3) / 8. + 1.);
  }

  float vSqrSourceDist4 = dot(source4 - vPositionW, source4 - vPositionW);
  float delta4 = sqrSourceDist4 - vSqrSourceDist4;
  float rangeTerm4 = 0.;
  if (delta4 > 0.) {
    rangeTerm4 = 1. / ((delta4 * delta4) / 8. + 1.);
  }

  gl_FragColor = vec4(rangeTerm1 + rangeTerm2 + rangeTerm3 + rangeTerm4, rangeTerm1 + rangeTerm2 + rangeTerm3 + rangeTerm4, rangeTerm1 + rangeTerm2 + rangeTerm3 + rangeTerm4, 1);
}
