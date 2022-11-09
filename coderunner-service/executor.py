from abc import ABC, abstractmethod
import subprocess

TIMEOUT = 10 # timeout for running user programs

class Executor(ABC):
    @staticmethod
    def is_language_supported(lang):
        return lang in ['python','js','cpp','java']

    @staticmethod
    def new(lang):
        l = {
            'python' : PythonExecutor,
            'js' : NodeExecutor,
            'cpp' : CppExecutor,
            'java' : JavaExecutor,
        }
        return l[lang]()
    @abstractmethod
    def run(self, src):
        pass
    @staticmethod
    def run_cmd(l):
        output = None
        err = None
        try:
            output = subprocess.check_output(l,  stderr=subprocess.STDOUT, timeout=TIMEOUT).decode('utf-8')
        except subprocess.CalledProcessError as e:
            err = e.output.decode('utf-8')
        except subprocess.TimeoutExpired as e:
            err = f"Program Timed out after {TIMEOUT} seconds"
        return output, err

class PythonExecutor(Executor):
    def run(self, src):
        return super().run_cmd(['python3','-c',src])

class NodeExecutor(Executor):
    def run(self, src):
        return super().run_cmd(['node','-e',src])

class CppExecutor(Executor):
    def run(self, src):
        name, err = super().run_cmd(['safe_touch',src,"cpp"])
        if err: return "Unable to create file"
        res, err = super().run_cmd(["g++", name,'-o',name.split('.')[0]])
        if err: return err
        return super().run_cmd([name.split('.')[0]])

class JavaExecutor(Executor):
    def run(self, src):
        name, err = super().run_cmd(['safe_touch',src,"java"])
        if err: return "Unable to create file"

        return super().run_cmd(["java", name])

