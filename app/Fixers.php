<?php

declare(strict_types=1);

/*
 * This file is part of PHP CS Fixer: custom fixers.
 *
 * (c) 2018 Kuba Werłos
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

namespace App;

use PhpCsFixer\Fixer\FixerInterface;

/**
 * @implements \IteratorAggregate<FixerInterface>
 */
final class Fixers implements \IteratorAggregate
{
    /**
     * @return \Generator<FixerInterface>
     */
    public function getIterator(): \Generator
    {
        $classNames = [];
        foreach (new \DirectoryIterator(__DIR__.'/Fixers') as $fileInfo) {
            $fileName = $fileInfo->getBasename('.php');
            if (\in_array($fileName, ['.', '..', 'AbstractFixer', 'AbstractTypesFixer', 'DeprecatingFixerInterface'], true)) {
                continue;
            }
            $classNames[] = __NAMESPACE__.'\\Fixers\\'.$fileName;
        }

        \sort($classNames);

        foreach ($classNames as $className) {
            $fixer = new $className();
            \assert($fixer instanceof FixerInterface);

            yield $fixer;
        }
    }
}
