
<!-- .slide: class="text-level-3" -->

## The problem with a conventional dev process
<!-- .element: class="text-size-heading-3" -->

<p class="fragment mt-200" data-fragment-index="1">When I started on my last project...

<div class="box flex-row mt-100 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="rectangle" data-arrow="->task-dev">Specifications</div>
  <div class="rectangle fragment" data-arrow="->task-test" id="task-dev" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="rectangle overlay-anchor fragment" data-arrow="->task-prod" id="task-test" data-fragment-index="4">Manual tests<br>(Tester)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="rectangle fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<p class="print"><img src="img/print/bdd-1.png"></img></p>

<div class="flex-row">
  <div class="flex-column tiny-gap">
    <ul class="mt-200 text-level-3 no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-x"></i>Regressions happen
      <li class="fragment"><i class="emo emoji-x"></i>Too many non regression tests to execute manually
    </ul>
    <div class="sticky fragment">
      <div class="sticky__content">
        Not very satisfying &nbsp; :(
      </div>
    </div>
  </div>
  <div class="bubble bubble-bottom-left fragment">
    <i class="emo emo-36 emoji-nerd_face"></i>
    <span class="bubble__text">Maybe we should automate <br> end to end tests...</span>
  </div>
</div>
    


---
<!-- .element: class="text-level-3" -->

<p class="mt-150">So, let's automate end to end tests...

<div class="box flex-row mt-150 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="rectangle" data-arrow="->task-dev">Specifications</div>
  <div class="rectangle fragment" id="task-dev" data-arrow="->task-test" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="rectangle overlay-anchor fragment" id="task-test" data-arrow="->task-prod" data-fragment-index="4">Test automation<br>(Tester & Developer)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="rectangle fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<img src="img/print/bdd-2.png" class="print"></img>

<div class="mt-200 flex-row">
  <div class="flex-column gap-10">
    <ul class="no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-thumbup"></i>Fewer regressions
      <li class="fragment"><i class="emo emoji-x"></i>Tests are difficult to write and to maintain <br> (the program wasn't designed with the tests in mind)
    </ul>
    <div class="sticky fragment">
        <div class="sticky__content">
          Better quality, but not efficient…
          <div class="fragment">and we intruced new difficulties&nbsp; :(</div>
      </div>
    </div>
  </div>
  <div class="bubble bubble-bottom-left fragment">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <span class="bubble__text">So…<br>What's the solution?</span>
  </div>
</div>

