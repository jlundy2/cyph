#!/bin/bash


cd $(cd "$(dirname "$0")" ; pwd)/..
dir="${PWD}"


platform="${1}"


./commands/nativeprojectinit.sh
checkfail

cd native

for p in android ios ; do
	if [ ! "${platform}" ] || [ "${platform}" == "${p}" ] ; then
		npm run ns-bundle "--${p}"
		checkfail
	fi
done

if [ ! "${platform}" ] ; then
	pass
fi

unbindmount node_modules
cp -a ../shared/lib/native/node_modules ./

compiledApp=''
if [ "${platform}" == 'android' ] ; then
	compiledApp='platforms/android/src/main/assets/app'
elif [ "${platform}" == 'ios' ] ; then
	compiledApp='platforms/ios/native/app'
fi

mv app/App_Resources App_Resources.tmp
rm -rf app
cp -rf ${compiledApp} app
rm -rf app/App_Resources
mv App_Resources.tmp app/App_Resources

cp assets/js/standalone/global.js bundle.js
echo >> bundle.js
cat app/bundle.js >> bundle.js

cp /node_modules/core-js/client/shim.js starter.js
echo >> starter.js
cat assets/js/standalone/global.js >> starter.js
echo >> starter.js
cat assets/js/cyph/crypto/native-web-crypto-polyfill.js >> starter.js
node -e 'console.log(`
	var crypto	= self.crypto;

	(function () {
		var exports	= undefined;
		var print	= function (s) { console.log(s); };
		importScripts("/assets/node_modules/libsodium/dist/browsers-sumo/sodium.js");
	})();

	self.accountRoot	= "";
	self.translations	= ${JSON.stringify(require("../commands/translations"))};
`)' >> starter.js
cat app/starter.js >> starter.js

${dir}/commands/websign/threadpack.js starter.js
mv bundle.js starter.js app/

pass
