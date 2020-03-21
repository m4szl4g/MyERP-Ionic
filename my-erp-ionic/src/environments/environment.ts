export const environment = {
  production: false,
  useMockBackend: true,
  // backendUrl: "http://localhost:60645", // direct url to microservice, only for testing
  backendUrl: 'http://localhost:5000', //api gateway
  mockBackendUrl: 'http://localhost:3000',
  auth0: {
    // Needed for Auth0 (capitalization: ID):
    clientID: '0CQ7bcrNFcpj7lZ9si3Ix5loaXEkklK7',
    // Needed for Auth0Cordova (capitalization: Id):
    clientId: '0CQ7bcrNFcpj7lZ9si3Ix5loaXEkklK7',
    domain: 'moovio.eu.auth0.com',
    packageIdentifier: 'io.ionic.myerp.mobile' // config.xml widget ID, e.g., com.auth0.ionic
  }
};
