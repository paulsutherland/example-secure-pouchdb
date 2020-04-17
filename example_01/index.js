import PouchDB from 'pouchdb'
import SecurePouch from 'polyonic-secure-pouch'
PouchDB.plugin(SecurePouch)

const localPath = './localdb'
const remoteURL = 'http://127.0.0.1:5984/remotedb'

const local = PouchDB(localPath)
const remote = PouchDB(remoteURL)

remote.encrypt('password')

// comment out to encrypt only the remote
// local.encrypt('password')

PouchDB.sync(local, remote, { live: true, retry: true })
  .on('complete', info => console.log({ output: info, message: 'complete' }))
  .on('error', err => console.error(Error({ output: err, message: 'error' })))
  .on('denied', err => console.error(Error({ output: err, message: 'denied' })))

for (var i = 0; i < 100; i++) {
  local.put({
    _id: `mydoc ${i}`,
    title: 'My New Doc'
  }).then(function (response) {
    // handle response
  }).catch(function (err) {
    console.log(err)
  })
}
