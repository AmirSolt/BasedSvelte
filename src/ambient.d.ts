interface User {
    id :string
    name: string
    email:string
}

interface Customer {
    stripe_customer_id: string
    stripe_subscription_id: string
    tier: int
}

