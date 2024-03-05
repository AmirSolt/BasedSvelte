




<div class="card">
	<h1>Sign up</h1>
	<form method="POST" action="?/signup" class="flex flex-col justify-center items-start gap-4 w-full pt-4">
		

        <label class="label" for="email">
            <span>Email</span>
            <input 
                id="email" 
                class="input" 
                type="email" 
                placeholder="example@email.com" 
                name="email" 
                autocomplete="email" />
        </label>

        
        <label class="label" for="password">
            <span>Password</span>
            <input 
                id="password" 
                class="input" 
                type="password" 
                name="password" 
                autocomplete="new-password" />
        </label>

		<button class="btn variant-filled" type="submit">Submit</button>	
			
	</form>
</div>

<br>

<p class="text-center">
	Have an account?
	<a href="/auth/login" class="underline ">Sign in</a>
</p>