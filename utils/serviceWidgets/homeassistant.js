const axios = require('axios');

module.exports = {
  name: 'Home Assistant',
  async fetchStatus(url, apiKey) {
    try {
      const headers = { Authorization: `Bearer ${apiKey}` };
      const base = url.replace(/\/+$/, '');

      const res = await axios.get(`${base}/api/`, {
        headers,
        timeout: 5000,
      });

      return {
        status: 'ok',
        line1: `Version: ${res.data.version || 'unknown'}`,
        line2: res.data.location_name || '',
      };
    } catch (err) {
      return {
        status: 'error',
        line1: err.message || err.code || 'Connection failed',
        line2: '',
      };
    }
  },
};
