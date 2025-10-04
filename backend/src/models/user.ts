import mongoose, {Schema, Types} from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 25,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            maxlength: 100,
        },

        password: {
            type: String,
            required: true,
            unique: true,
            maxlength: 50,
        },

        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/53/53101.png",
        },

        posts: [
            {
                type: Types.ObjectId,
                ref: "post"
            },
        ],

        followers: [
            {
                type: Types.ObjectId,
                ref: "user"
            },
        ],

        following: [
            {
                type: Types.ObjectId,
                ref: "user"
            },
        ],

        liked: [
            {
                type: Types.ObjectId,
                ref: "post"
            },
        ],

        likedComments: [
            {
                type: Types.ObjectId,
                ref: "comment"
            }
        ],

        closet: [
            {
                type: Types.ObjectId,
                ref: 'garment'
            }
        ]
    }
);

module.exports = mongoose.model('UserModel', userSchema);
