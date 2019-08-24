# @vx/gradient

<a title="@vx/gradient npm downloads" href="https://www.npmjs.com/package/@vx/gradient">
  <img src="https://img.shields.io/npm/dm/@vx/gradient.svg?style=flat-square" />
</a>

Inspired by: https://dribbble.com/shots/3380672-Sketch-Gradients-Freebie

## Example

```js
import { AreaClosed } from '@vx/shape';
import { GradientPinkBlue } from '@vx/gradient';

const GradientArea = () => {
  return (
    <svg>
      <GradientPinkBlue id="gradient" />
      <AreaClosed fill="url('#gradient')" />
    </svg>
  );
};
```

## The Definition Caveat

Like patterns, gradients are "defined." When you render `<GradientPinkBlue />`, it's rendering a [`<linearGradient/>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) element inside a `<def>` in the SVG.

It's often better to think of these as variable definitions rather than true DOM elements. When you use `fill="url('#gradient')"` you're referencing the gradient's id: `gradient`.

## Make your own!

You can make any linear gradient like so:

```js
import { LinearGradient } from '@vx/gradient';

<LinearGradient from="#a18cd1" to="#fbc2eb" />;
```


## Installation

```
npm install --save @vx/gradient
```


## Components



  - [GradientDarkgreenGreen](#gradientdarkgreengreen-)
  - [GradientLightgreenGreen](#gradientlightgreengreen-)
  - [GradientOrangeRed](#gradientorangered-)
  - [GradientPinkBlue](#gradientpinkblue-)
  - [GradientPinkRed](#gradientpinkred-)
  - [GradientPurpleOrange](#gradientpurpleorange-)
  - [GradientPurpleRed](#gradientpurplered-)
  - [GradientPurpleTeal](#gradientpurpleteal-)
  - [GradientSteelPurple](#gradientsteelpurple-)
  - [GradientTealBlue](#gradienttealblue-)
  - [LinearGradient](#lineargradient-)
  - [RadialGradient](#radialgradient-)

## API



<h3 id="gradientdarkgreengreen-">&lt;GradientDarkgreenGreen /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientDarkgreenGreen__from" name="GradientDarkgreenGreen__from" href="#GradientDarkgreenGreen__from">#</a> *GradientDarkgreenGreen*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#184E86'</td></td></table>

<a id="#GradientDarkgreenGreen__to" name="GradientDarkgreenGreen__to" href="#GradientDarkgreenGreen__to">#</a> *GradientDarkgreenGreen*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#57CA85'</td></td></table>

<h3 id="gradientlightgreengreen-">&lt;GradientLightgreenGreen /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientLightgreenGreen__from" name="GradientLightgreenGreen__from" href="#GradientLightgreenGreen__from">#</a> *GradientLightgreenGreen*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#42E695'</td></td></table>

<a id="#GradientLightgreenGreen__to" name="GradientLightgreenGreen__to" href="#GradientLightgreenGreen__to">#</a> *GradientLightgreenGreen*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#3BB2B8'</td></td></table>

<h3 id="gradientorangered-">&lt;GradientOrangeRed /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientOrangeRed__from" name="GradientOrangeRed__from" href="#GradientOrangeRed__from">#</a> *GradientOrangeRed*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#FCE38A'</td></td></table>

<a id="#GradientOrangeRed__to" name="GradientOrangeRed__to" href="#GradientOrangeRed__to">#</a> *GradientOrangeRed*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#F38181'</td></td></table>

<h3 id="gradientpinkblue-">&lt;GradientPinkBlue /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientPinkBlue__from" name="GradientPinkBlue__from" href="#GradientPinkBlue__from">#</a> *GradientPinkBlue*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#F02FC2'</td></td></table>

<a id="#GradientPinkBlue__to" name="GradientPinkBlue__to" href="#GradientPinkBlue__to">#</a> *GradientPinkBlue*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#6094EA'</td></td></table>

<h3 id="gradientpinkred-">&lt;GradientPinkRed /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientPinkRed__from" name="GradientPinkRed__from" href="#GradientPinkRed__from">#</a> *GradientPinkRed*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#F54EA2'</td></td></table>

<a id="#GradientPinkRed__to" name="GradientPinkRed__to" href="#GradientPinkRed__to">#</a> *GradientPinkRed*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#FF7676'</td></td></table>

<h3 id="gradientpurpleorange-">&lt;GradientPurpleOrange /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientPurpleOrange__from" name="GradientPurpleOrange__from" href="#GradientPurpleOrange__from">#</a> *GradientPurpleOrange*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#7117EA'</td></td></table>

<a id="#GradientPurpleOrange__to" name="GradientPurpleOrange__to" href="#GradientPurpleOrange__to">#</a> *GradientPurpleOrange*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#EA6060'</td></td></table>

<h3 id="gradientpurplered-">&lt;GradientPurpleRed /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientPurpleRed__from" name="GradientPurpleRed__from" href="#GradientPurpleRed__from">#</a> *GradientPurpleRed*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#622774'</td></td></table>

<a id="#GradientPurpleRed__to" name="GradientPurpleRed__to" href="#GradientPurpleRed__to">#</a> *GradientPurpleRed*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#C53364'</td></td></table>

<h3 id="gradientpurpleteal-">&lt;GradientPurpleTeal /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientPurpleTeal__from" name="GradientPurpleTeal__from" href="#GradientPurpleTeal__from">#</a> *GradientPurpleTeal*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#5B247A'</td></td></table>

<a id="#GradientPurpleTeal__to" name="GradientPurpleTeal__to" href="#GradientPurpleTeal__to">#</a> *GradientPurpleTeal*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#1BCEDF'</td></td></table>

<h3 id="gradientsteelpurple-">&lt;GradientSteelPurple /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientSteelPurple__from" name="GradientSteelPurple__from" href="#GradientSteelPurple__from">#</a> *GradientSteelPurple*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#65799B'</td></td></table>

<a id="#GradientSteelPurple__to" name="GradientSteelPurple__to" href="#GradientSteelPurple__to">#</a> *GradientSteelPurple*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#5E2563'</td></td></table>

<h3 id="gradienttealblue-">&lt;GradientTealBlue /&gt;</h3>

All props pass through to `<LinearGradient {...props} />`

<a id="#GradientTealBlue__from" name="GradientTealBlue__from" href="#GradientTealBlue__from">#</a> *GradientTealBlue*.**from**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#17EAD9'</td></td></table>

<a id="#GradientTealBlue__to" name="GradientTealBlue__to" href="#GradientTealBlue__to">#</a> *GradientTealBlue*.**to**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'#6078EA'</td></td></table>

<h3 id="lineargradient-">&lt;LinearGradient /&gt;</h3>



<a id="#LinearGradient__children" name="LinearGradient__children" href="#LinearGradient__children">#</a> *LinearGradient*.**children**&lt;any&gt;  

<a id="#LinearGradient__from" name="LinearGradient__from" href="#LinearGradient__from">#</a> *LinearGradient*.**from**&lt;string&gt;  

<a id="#LinearGradient__fromOffset" name="LinearGradient__fromOffset" href="#LinearGradient__fromOffset">#</a> *LinearGradient*.**fromOffset**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'0%'</td></td></table>

<a id="#LinearGradient__fromOpacity" name="LinearGradient__fromOpacity" href="#LinearGradient__fromOpacity">#</a> *LinearGradient*.**fromOpacity**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#LinearGradient__id" name="LinearGradient__id" href="#LinearGradient__id">#</a> *LinearGradient*.**id**&lt;string&gt; `required` 

<a id="#LinearGradient__rotate" name="LinearGradient__rotate" href="#LinearGradient__rotate">#</a> *LinearGradient*.**rotate**&lt;union(string|number)&gt;  

<a id="#LinearGradient__to" name="LinearGradient__to" href="#LinearGradient__to">#</a> *LinearGradient*.**to**&lt;string&gt;  

<a id="#LinearGradient__toOffset" name="LinearGradient__toOffset" href="#LinearGradient__toOffset">#</a> *LinearGradient*.**toOffset**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'100%'</td></td></table>

<a id="#LinearGradient__toOpacity" name="LinearGradient__toOpacity" href="#LinearGradient__toOpacity">#</a> *LinearGradient*.**toOpacity**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#LinearGradient__transform" name="LinearGradient__transform" href="#LinearGradient__transform">#</a> *LinearGradient*.**transform**&lt;string&gt;  

<a id="#LinearGradient__vertical" name="LinearGradient__vertical" href="#LinearGradient__vertical">#</a> *LinearGradient*.**vertical**&lt;bool&gt;  <table><tr><td><strong>Default</strong></td><td>true</td></td></table>

<a id="#LinearGradient__x1" name="LinearGradient__x1" href="#LinearGradient__x1">#</a> *LinearGradient*.**x1**&lt;string&gt;  

<a id="#LinearGradient__x2" name="LinearGradient__x2" href="#LinearGradient__x2">#</a> *LinearGradient*.**x2**&lt;string&gt;  

<a id="#LinearGradient__y1" name="LinearGradient__y1" href="#LinearGradient__y1">#</a> *LinearGradient*.**y1**&lt;string&gt;  

<a id="#LinearGradient__y2" name="LinearGradient__y2" href="#LinearGradient__y2">#</a> *LinearGradient*.**y2**&lt;string&gt;  

<h3 id="radialgradient-">&lt;RadialGradient /&gt;</h3>



<a id="#RadialGradient__children" name="RadialGradient__children" href="#RadialGradient__children">#</a> *RadialGradient*.**children**&lt;any&gt;  

<a id="#RadialGradient__from" name="RadialGradient__from" href="#RadialGradient__from">#</a> *RadialGradient*.**from**&lt;string&gt;  

<a id="#RadialGradient__fromOffset" name="RadialGradient__fromOffset" href="#RadialGradient__fromOffset">#</a> *RadialGradient*.**fromOffset**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'0%'</td></td></table>

<a id="#RadialGradient__fromOpacity" name="RadialGradient__fromOpacity" href="#RadialGradient__fromOpacity">#</a> *RadialGradient*.**fromOpacity**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#RadialGradient__id" name="RadialGradient__id" href="#RadialGradient__id">#</a> *RadialGradient*.**id**&lt;string&gt; `required` 

<a id="#RadialGradient__rotate" name="RadialGradient__rotate" href="#RadialGradient__rotate">#</a> *RadialGradient*.**rotate**&lt;union(string|number)&gt;  

<a id="#RadialGradient__to" name="RadialGradient__to" href="#RadialGradient__to">#</a> *RadialGradient*.**to**&lt;string&gt;  

<a id="#RadialGradient__toOffset" name="RadialGradient__toOffset" href="#RadialGradient__toOffset">#</a> *RadialGradient*.**toOffset**&lt;string&gt;  <table><tr><td><strong>Default</strong></td><td>'100%'</td></td></table>

<a id="#RadialGradient__toOpacity" name="RadialGradient__toOpacity" href="#RadialGradient__toOpacity">#</a> *RadialGradient*.**toOpacity**&lt;number&gt;  <table><tr><td><strong>Default</strong></td><td>1</td></td></table>

<a id="#RadialGradient__transform" name="RadialGradient__transform" href="#RadialGradient__transform">#</a> *RadialGradient*.**transform**&lt;string&gt;  
