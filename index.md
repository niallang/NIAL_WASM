---
title: Nial in the Browser
layout: home
---

# Nial with Emscripten

Welcome to the online version of Nial running completely in your browser.

You can access the interpreter using the link [[Nial Interpreter]](current/index.html)

This is a nearly complete version of Nial built using the Emscripten SDK. It 
comes with a transient UNIX file system, home directory and Nial library.
      
You can write and read files during a session but the contents will disappear 
when you close or reload the browser window.

Two input modes are provided, a line oriented mode and a CodeMirror editor
window with syntax highlighting for Nial.

The line oriented mode mimics terminal input, pressing return in this will 
send the contents of the window to Nial as  single line. It will also allow 
you to send empty lines which are useful at times.

If you press return inthe 
Nial input for evaluation can be done in one of two ways. You can either 
use the single line input mode and press return to evaluate it or you
can compose Nial code in the CodeMirror editor for evaluation.

In the CodeMirror window allows yo to select multiple lines of Nial code 
either press the *Execute* button or type *Control/Return* to execute the code. 

If you just want to execute a single line you can go to that line and type
*Control/Return*.

For more information on **Nial** including the language definition, tutorials
and details of the library functions go to the 
[Nial Language Website](https://www.nial-array-lannguage.org).

