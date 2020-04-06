const chai = require('chai')
const assert = chai.assert

const dotenv = require('dotenv')
dotenv.config({
  path: '../.env.test',
})

const admin = require('firebase-admin')
const test = require('firebase-functions-test')(
  {
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
  },
  process.env.CREDENTIALS_PATH
)

test.mockConfig({
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  credentialsPath: process.env.CREDENTIALS_PATH,
})

function returnDefaultUserData() {
  return {
    email: 'a@a.com',
    password: '123456',
    name: 'Lucas',
    surname: 'Mantovani',
    birthDate: new Date(1999, 09, 22),
    school: 'Fenix',
    gender: 'male',
  }
}

describe('Cloud functions', function () {
  this.timeout(0)
  let myFunctions

  let userData = returnDefaultUserData()

  before(function () {
    myFunctions = require('../lib/index')
  })

  after(function () {
    test.cleanup()
  })

  describe('createUser', function () {
    let createUser
    let response

    before(function () {
      createUser = test.wrap(myFunctions.createUser)
    })

    beforeEach(async function () {
      userData = returnDefaultUserData()
    })

    after(function () {
      userData = returnDefaultUserData()
    })

    afterEach(async function () {
      if (response.uid) {
        await admin.auth().deleteUser(response.uid)

        const userDocReference = admin.firestore().doc(`users/${response.uid}`)
        const userDocSnapshot = await userDocReference.get()
        if (userDocSnapshot.exists) {
          await userDocReference.delete()
        }
      }
    })

    it('should create user', async function () {
      response = await createUser(userData)
      assert.property(response, 'uid')
    })

    it('should create user document', async function () {
      response = await createUser(userData)
      const userDocSnapshot = await admin
        .firestore()
        .doc(`users/${response.uid}`)
        .get()
      assert.isTrue(userDocSnapshot.exists)
    })

    it('should validate user schema', async function () {
      try {
        userData.birthDate = '22/09/1999'
        response = await createUser(userData)
      } catch (error) {
        response = error
        assert.propertyVal(error, 'code', 'invalid-argument')
      }
    })
  })
})
