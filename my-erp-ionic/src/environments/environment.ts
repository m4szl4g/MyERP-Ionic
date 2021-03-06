export const environment = {
  production: false,
  useMockBackend: true,
  // backendUrl: "http://localhost:60645", // direct url to microservice, only for testing
  backendUrl: 'http://localhost:5000', //api gateway
  mockBackendUrl: 'http://192.168.0.16:3000', // see ReadMe.md!
  auth0: {
    clientID: '0CQ7bcrNFcpj7lZ9si3Ix5loaXEkklK7',
    // Needed for Auth0Cordova (capitalization: Id):
    clientId: '0CQ7bcrNFcpj7lZ9si3Ix5loaXEkklK7',
    domain: 'moovio.eu.auth0.com',
    packageIdentifier: 'io.ionic.myerp.mobile'
  }
};
