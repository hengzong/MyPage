var request = require('supertest');
var assert = require('assert');
request = request('http://localhost:4000');

var num_component = 0;
var to_be_delete_id = 0;
var test_id = 0;

assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  function(err) {
    if ( (err instanceof Error) && /value/.test(err) ) {
      return true;
    }
  },
  "unexpected error"
);

  describe('POST /search', function () {
    it('support search by user\'s last name', function (done) {
      request
          .post('/search')
          .send({key: 'q'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(async function(res) {
              if(res.body.data.length !== 1) {
                throw new Error("Did not support last name search");
              }
            })
          .end(function(err, res) {
              if (err) return done(err);
              done();
          });
    });
  });

  describe('PUT /api/users/:id', function () {
    it('should update user\'s latitude and longitude', function (done) {
      request
          .put('/api/users/lala')
          .send({latitude: "41.113994", longitude: "-81.224470"})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(async function(res) {
              if(res.body.data.latitude !== "41.113994" || res.body.data.longitude !== "-81.224470") {
                throw new Error("Fail to update user's location");
              }
            })
          .end(function(err, res) {
              if (err) return done(err);
              done();
          });
    });
  });

  describe('PUT /api/components/:id', function () {
    it('should update component\'s title', function (done) {
      request
          .put('/api/components/5cc5dce4e7191ecacc397721')
          .send({title: "hello"})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(async function(res) {
              if(res.body.data.title !== "hello") {
                throw new Error("Fail to update component's title");
              }
            })
          .end(function(err, res) {
              if (err) return done(err);
              done();
          });
    });
  });



// describe('POST /register', function () {
//   it('every new registered user has a default component \'about me\'', function (done) {
//       request
//           .post('/register')
//           .send({user_name: 'emma'+(Math.random()).toString(), email: 'emma'+(Math.random()).toString()+'@gmail.com', password: '123456'})
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(201)
//           .expect(function(res) {
//               if (res.body.data.componentList.length !== 1) {
//                 throw new Error("Did not automatically create a component for new user");
//               }
//             })
//           .end(function(err, res) {
//               if (err) return done(err);
//               done();
//           });
//   });
// });
//
//
//   describe('POST /api/components', function () {
//     it('store user\'s old number of components', function (done) {
//       request
//           .get('/api/users/lala')
//           .expect(async function(res) {
//               num_component = res.body.data.componentList.length;
//             })
//           .end(function(err, res) {
//               if (err) return done(err);
//               done();
//           });
//   });
//
//     it('add new component', function (done) {
//         request
//             .post('/api/components')
//             .send({user_name: 'lala'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(201)
//             .end(function(err, res) {
//                 if (err) return done(err);
//                 done();
//             });
//     });
//
//     it('every new added component\'s id should be added into its owner database', function (done) {
//       request
//           .get('/api/users/lala')
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(async function(res) {
//             num_component = res.body.data.componentList.length - 1;
//           })
//           .end(function(err, res) {
//               if (err) return done(err);
//               done();
//           });
//   });
//
// });
//
// describe('Delete /api/components', function () {
//   it('store user\'s old number of components', function (done) {
//     request
//         .get('/api/users/lala')
//         .expect(async function(res) {
//             num_component = res.body.data.componentList.length;
//             to_be_delete_id = res.body.data.componentList[num_component-1];
//             console.log(to_be_delete_id);
//           })
//         .end(function(err, res) {
//             if (err) return done(err);
//             done();
//         });
// });
//
//   it('delete a component', function (done) {
//       request
//           .delete('/api/components/'+to_be_delete_id)
//           .set('Accept', 'application/json')
//           .expect('Content-Type', /json/)
//           .expect(200)
//           .end(function(err, res) {
//               if (err) return done(err);
//               done();
//           });
//   });
//
//   it('owner\'s total number of components should also decrease by 1', function (done) {
//     request
//         .get('/api/users/lala')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(async function(res) {
//           num_component = res.body.data.componentList.length - 1;
//         })
//         .end(function(err, res) {
//             if (err) return done(err);
//             done();
//         });
// });
//
// });
//
//
// describe('PUT /api/components/:id', function () {
//   it('add a test component', function (done) {
//     request
//         .post('/api/components')
//         .send({user_name: 'lala'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(201)
//         .expect(function(res) {
//           test_id = res.body.data._id;
//         })
//         .end(function(err, res) {
//             if (err) return done(err);
//             done();
//         });
//   });
//
//   it('user_name should not be updated', function (done) {
//     request
//         .put('/api/components/'+test_id)
//         .send({user_name: 'lala'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(400)
//         .end(function(err, res) {
//             if (err) return done(err);
//             done();
//         });
//   });
//
//   it('should update component title', function (done) {
//     request
//         .put('/api/components/'+test_id)
//         .send({title: 'hello'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function(res) {
//           if (res.body.data.title !== 'hello') {
//             throw new Error("did not update component title");
//           }
//         })
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//   });
//
//   it('should update component innerHTML', function (done) {
//     request
//         .put('/api/components/'+test_id)
//         .send({innerHTML: 'hello'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function(res) {
//           if (res.body.data.innerHTML !== 'hello') {
//             throw new Error("did not update component innerHTML");
//           }
//         })
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//   });
//
//   it('should update component editorState', function (done) {
//     request
//         .put('/api/components/'+test_id)
//         .send({editorState: 'hello'})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .expect(function(res) {
//           if (res.body.data.editorState !== 'hello') {
//             throw new Error("did not update component editorState");
//           }
//         })
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         });
//   });
//
// });


// describe('POST /register', function () {
//     it('should not register an user with duplicate name', function (done) {
//         request
//             .post('/register')
//             .send({user_name: 'heng', email: 'heng@gmail.com', password: '123456'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(400)
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
// });

// describe('POST /user_name', function () {
//     it('should return \'duplicated\' for used user_name', function (done) {
//         request
//             .post('/user_name')
//             .send({user_name: 'heng'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.message !== "duplicated") {
//                 console.log(res.body.message);
//                 throw new Error("return message is not \'duplicated\'");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
//     it('should return \'ok\' for unused user_name', function (done) {
//         request
//             .post('/user_name')
//             .send({user_name: '12345'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.message !== "ok") {
//                 console.log(res.body.message);
//                 throw new Error("return message is not \'ok\'");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
// });

// describe('POST /email', function () {
//     it('should return \'duplicated\' for used email', function (done) {
//         request
//             .post('/email')
//             .send({email: 'hehe@gmail.com'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.message !== "duplicated") {
//                 console.log(res.body.message);
//                 throw new Error("return message is not \'duplicated\'");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
//     it('should return \'ok\' for unused email', function (done) {
//         request
//             .post('/email')
//             .send({email: '12345@gmail.com'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.message !== "ok") {
//                 throw new Error("return message is not \'ok\'");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
// });

// describe('POST /search', function () {
//     it('should return a list of user whose user_name contains \'he\'', function (done) {
//         request
//             .post('/search')
//             .send({key: 'he'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.data.length !== 7) {
//                 throw new Error("missing data");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
// });

// describe('PUT /api/users:user_name', function () {
//     it('should update user name', function (done) {
//         request
//             .put('/api/users/zong')
//             .send({
//               "first_name": "heng",
//               "last_name": "zong"
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.data.first_name !== "heng" || res.body.data.last_name !== "zong") {
//                 throw new Error("fail to update name");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
//     it('should update user avatar_url', function (done) {
//         request
//             .put('/api/users/zong')
//             .send({
//               "avatar_url": "https://images-na.ssl-images-amazon.com/images/I/41LMQ-wZ2oL._SX425_.jpg"
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.data.avatar_url !== "https://images-na.ssl-images-amazon.com/images/I/41LMQ-wZ2oL._SX425_.jpg") {
//                 throw new Error("faile to update avatar_url");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
//     it('should update user outerLinks', function (done) {
//         request
//             .put('/api/users/zong')
//             .send({
//               "outerLinks":
//                 {
//                   "facebook":"temp facebook_url",
//                   "instgram":"temp instgram_url",
//                   "linkedin":"temp linkedin_url",
//                   "twitter":"temp twitter_url",
//                   "github":"temp github_url"
//                 }
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               // console.log(res.body.data.outerLinks);
//               if (res.body.data.outerLinks.facebook !== "temp facebook_url" ||
//                   res.body.data.outerLinks.instgram !== "temp instgram_url" ||
//                   res.body.data.outerLinks.linkedin !== "temp linkedin_url" ||
//                   res.body.data.outerLinks.twitter !== "temp twitter_url" ||
//                   res.body.data.outerLinks.github !== "temp github_url") {
//                 throw new Error("fail to update outerLinks");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
//     it('should update user bio', function (done) {
//         request
//             .put('/api/users/zong')
//             .send({
//               "bio": {
//                 "title": "about me",
//                 "content": "this is my story"
//               }
//             })
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .expect(function(res) {
//               if (res.body.data.bio.title !== "about me" ||
//                   res.body.data.bio.content !== "this is my story") {
//                 throw new Error("fail to update bio");
//               }
//             })
//             .end(function(err, res) {
//               if (err) return done(err);
//               done();
//             });
//     });
// });
