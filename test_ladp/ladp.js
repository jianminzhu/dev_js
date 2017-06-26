 

    //	  'host'=>'ldap.sogou-inc.com',
    //      'port'=>389,
    //      'base_dn'=>'ou=Sogou,dc=sogou-inc,dc=com',
    //      'uid'=>'mailNickname',
    //      'bind_dn'=>'cacti@sogou-inc.com',
    //      'password'=>'sogouorz',
var LDAP = require('ldap-client'); 
var ldap = new LDAP({
    uri:             'ldap://ldap.sogou-inc.com:389',   // string
    validatecert:    false,             // Verify server certificate
    connecttimeout:  -1,                // seconds, default is -1 (infinite timeout), connect timeout
    base:            'ou=Sogou,dc=sogou-inc,dc=com',          // default base for all future searches
    attrs:           '*',               // default attribute list for future searches
    filter:          '(objectClass=*)', // default filter for all future searches
    scope:           LDAP.SUBTREE,      // default scope for all future searches
    connect: function() {
        ldap.bind({
            binddn: 'ou=Sogou,dc=sogou-inc,dc=com',
            password: 'sogouorz'
        }, function(err) {
          
        });
    },        // optional function to call when connect/reconnect occurs
    disconnect:      function(),        // optional function to call when disconnect occurs        
}, function(err) {
    // connected and ready    
});