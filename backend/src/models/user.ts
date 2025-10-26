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
        },

        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/53/53101.png",
        },

        posts: [
            {
                type: Types.ObjectId,
                ref: "PostModel"
            },
        ],

        followers: [
            {
                type: Types.ObjectId,
                ref: "UserModel"
            },
        ],

        following: [
            {
                type: Types.ObjectId,
                ref: "UserModel"
            },
        ],

        liked: [
            {
                type: Types.ObjectId,
                ref: "PostModel"
            },
        ],

        closet: [
            {
                type: Types.ObjectId,
                ref: 'GarmentModel'
            }
        ],

        outfits: [
            {
                type: Types.ObjectId,
                ref: 'OutfitModel'
            }
        ]
    }
);

module.exports = mongoose.model('UserModel', userSchema);
