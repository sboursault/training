
<!-- .slide: class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 9</span>
    <h1>Extra exercices</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>


---


## Handle CSRF protection WIP
<!-- .element: data-tags="practice, optional" class="text-size-heading-3" -->

<div class="exercice text-level-3">


  <p>A CSRF protection was added on the APIs that relies on the user session and that modifies data

  <p>Let's code
  <ul>
    <li>On the calls that don't pass anymore, add a <code>X-CSRFToken</code> header with the value from the <code>csrftoken</code> cookie.
  </ul>
  <p>Useful links
  <ul style="font-size:75%">
    <li class="url-link"> COOKIES
  </ul>

</div>