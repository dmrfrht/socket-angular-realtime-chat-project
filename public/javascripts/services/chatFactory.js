app.factory('chatFactory', ['$http', ($http) => {
  const getMessages = roomId => {
    return $http({
      url: 'http://localhost:3000/messages/list',
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
