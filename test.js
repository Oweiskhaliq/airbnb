<%- include('../partials/head') %>
</head>
<body class="bg-gray-100">
  <%- include('../partials/nav') %>

  <!-- Trigger Button (can be anywhere in nav or elsewhere) -->
  <div class="text-center my-10">
    <button onclick="toggleModal()" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Login</button>
  </div>

  <!-- Modal Overlay -->
  <div id="loginModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
    <!-- Modal Content -->
    <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto p-6 relative">
      
      <!-- Close Button -->
      <button onclick="toggleModal()" class="absolute top-3 right-4 text-xl text-gray-400 hover:text-black">✕</button>

      <!-- Header -->
      <h2 class="text-lg font-semibold mb-2">Log in or sign up</h2>
      <h1 class="text-xl font-bold mb-4">Welcome to Airbnb</h1>

      <!-- Login Form -->
      <form action="/login" method="POST" class="space-y-4">
        <%- include('../partials/errors.ejs') %>

        <!-- Email -->
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value="<%= oldInput ? oldInput.email : '' %>"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />

        <!-- Password -->
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
        />

        <!-- Submit -->
        <input
          type="submit"
          value="Continue"
          class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        />
      </form>

      <!-- OR Divider -->
      <div class="flex items-center my-4">
        <hr class="flex-grow border-t border-gray-300" />
        <span class="mx-2 text-sm text-gray-500">or</span>
        <hr class="flex-grow border-t border-gray-300" />
      </div>

      <!-- Social Logins -->
      <div class="space-y-3">
        <a href="/auth/google" class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5 mr-2" />
          <span class="text-sm">Continue with Google</span>
        </a>
        <a href="/auth/facebook" class="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/349526/facebook.svg" class="w-5 h-5 mr-2" />
          <span class="text-sm">Continue with Facebook</span>
        </a>
      </div>

      <!-- Signup -->
      <p class="text-center text-sm text-gray-600 mt-4">
        Not registered yet?
        <a href="/signup" class="text-red-500 hover:underline">Sign up</a>
      </p>
    </div>
  </div>

  <!-- Modal Script -->
  <script>
    function toggleModal() {
      const modal = document.getElementById('loginModal');
      modal.classList.toggle('hidden');
    }
  </script>

  <%- include('../partials/footer') %>
</body>
</html>
