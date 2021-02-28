app.factory('chatFactory', ['$http', 'env', ($http, env) => {
  const getMessages = roomId => {
    return $http({
      url: env.SERVICE_URL + 'messages/list',
      method: 'GET',
      params: {roomId}
    })
      .then(res => {
        return res.data
      })
      .catch(err => {
        if (err) console.error(err)
      })
  }

  return {
    getMessages
  }
}])
