const axios = require('axios');

module.exports = {
  name: 'Jellyfin',
  async fetchStatus(url, apiKey) {
    try {
      const headers = { 'X-Emby-Token': apiKey };
      const base = url.replace(/\/+$/, '');

      const [systemRes, countsRes] = await Promise.all([
        axios.get(`${base}/System/Info`, { headers, timeout: 5000 }),
        axios.get(`${base}/Items/Counts`, { headers, timeout: 5000 }),
      ]);

      const counts = countsRes.data;

      return {
        status: 'ok',
        line1: `Movies: ${counts.MovieCount || 0}`,
        line2: `Series: ${counts.SeriesCount || 0}`,
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
