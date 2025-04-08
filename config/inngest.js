import { Inngest } from "inngest";
import connectedDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest function to save user data to database
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {
        const {id, first_name, last_name, eamil_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:eamil_addresses[0].eamil_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectedDB()
        await User.create(userData)
    }
)

// Inngest function to update user data to database

export const syncUserUpation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {id, first_name, last_name, eamil_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:eamil_addresses[0].eamil_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectedDB()
        await User.findByIdAndUpdate(id,userData    )
    }
)


// Inngest function to update user data to database

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        // const {id, first_name, last_name, eamil_addresses, image_url} = event.data
        // const userData = {
        //     _id:id,
        //     email:eamil_addresses[0].eamil_address,
        //     name: first_name + ' ' + last_name,
        //     imageUrl: image_url
        // }
        await connectedDB()
        await User.findByIdAndDelete(id,userData    )
    }
)