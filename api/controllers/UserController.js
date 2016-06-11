/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	register: function(req,res){
            var data=[
            {
                'username': req.param('username'),
                'password': req.param('password'),
                'name': req.param('name'),
                'birthday': req.param('birthday'),
                'description': req.param('description')
            }
        ];
            User.create(data).exec(function callback(error,users_created){
                if(error)
                {
                    console.log(error);
                }
                else
                    console.log(users_created);
                return res.json(users_created);
            });
        },
        findByUsername: function (req, res) {
        var data = req.param('username');
        console.log(data);
        User.findOne({username: data})
                .exec(function (err, user) {
                    if (err) {
                        return res.json({
                            error: err
                        });
                    }
                    if (user === undefined) {
                        return res.notFound();
                    }
                    else
                        return res.json({
                            notFound: false,
                            userData: user
                        });
                });
    }
};

