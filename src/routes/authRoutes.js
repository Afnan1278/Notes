const {ROLE} = require('../const/app_role');

const routes = {
    
    'notes':[
        {p:'/note/list',m:'GET',a:'list',r:[ROLE.Admin,ROLE.Customer]},
        {p:'/note/create',m:'POST',a:'create',r:[ROLE.Admin,ROLE.Customer]},
        {p:'/note/update',m:'PUT',a:'update',r:[ROLE.Admin,ROLE.Customer]},
        {p:'/note/getNote',m:'GET',a:'getNote',r:[ROLE.Admin,ROLE.Customer]},
        {p:'/note/remove',m:'DELETE',a:'remove',r:[ROLE.Admin,ROLE.Customer]},

    ],
    
}

module.exports = routes;