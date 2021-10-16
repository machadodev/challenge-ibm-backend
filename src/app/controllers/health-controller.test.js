const healthController = require('./health-controller');

describe('Controllers :: HealthController', () => {
  const mockRes = {
    json: jest.fn((x) => x),
  };

  const health = healthController.getHealth({}, mockRes);
  const UP = { status: 'UP' };

  it('Health check should return UP when app is reachable', () => {
    expect(health).toMatchObject(UP);
  });
});
