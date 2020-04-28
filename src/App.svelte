<script>
  import Encrypt from "./encrypt.js"
  let encrypt = new Encrypt();
  
  let offset = 0;
  let plaintext = "The cake is a lie"
  let hiddenText = "";
  
  let wordState = "";
  
  function visualEncrypt(){
    wordState = 'Encrypted'
    encrypt.plaintext = plaintext
    encrypt.caesarOffset = offset
    encrypt.encryptList()
    hiddenText = encrypt.list.join(" ")
    console.log(encrypt)
  }
  
  function visualDecrypt(){
    wordState =  'Decrypted'
    encrypt.decryptList()
    hiddenText = encrypt.list.join(" ")

  }
  
  
</script>

<style>
  
  .main {
    background-color: ghostwhite;
    padding: 1em;
  }
  
  .dashboard {
    border: 1px solid grey;
    padding: 0.5em;
  }
  
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<div class = "main">
  <div class = 'dashboard'>
    <h3>Choose Values to Encrypt</h3>
      <input bind:value={plaintext}>
      <label>
        <input type=number bind:value={offset} min=0 max=26>
      </label>
    {#if '' === wordState || 'Decrypted' === wordState}
      <button on:click={visualEncrypt}>
		    Encrypt
	    </button>
    {:else}
      <button on:click={visualDecrypt}>
		    Decrypt
	    </button>
    {/if}
  </div>
  <div>
    <p>Offset Value: {encrypt.caesarOffset }</p>
    <p>Plaintext Value: {encrypt.plaintext}</p>
    {#if 'Encrypted' === wordState}
      <p>Encrypted Text: <b>{hiddenText}</b></p>
    {:else if 'Decrypted' === wordState}
      <p>Decrypted Text: <b>{hiddenText}</b></p>
    {:else}
      <p>Text not encrypted/decrypted yet. </p>
     {/if}
  </div>
</div>
